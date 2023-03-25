import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { TokensDto } from './dto/tokens.dto';
import { TGoogleUserData } from './types/google-user-data.type';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Creates new user and returns auth tokens' })
  @ApiCreatedResponse({ type: TokensDto })
  signUp(@Body() signUpDto: SignUpDto): Promise<TokensDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Returns auth tokens' })
  @ApiCreatedResponse({ type: TokensDto })
  login(@Body() loginDto: LoginDto): Promise<TokensDto> {
    return this.authService.login(loginDto);
  }

  // TODO: make sure it is okay to pass refresh token in header
  @Get('sign-out')
  @ApiBearerAuth('refresh_token')
  @ApiOperation({ summary: 'Removes the refresh token from database' })
  signOut(@Headers() headers: Request['headers']): Promise<void> {
    const { authorization } = headers;
    if (!authorization) throw new UnauthorizedException();
    const [tokenName, refreshToken] = authorization.split(' ');
    if (tokenName !== 'Bearer' || !refreshToken)
      throw new UnauthorizedException();

    return this.authService.signOut(refreshToken);
  }

  // TODO: make sure it is okay to pass refresh token in header
  @Get('refresh')
  @ApiBearerAuth('refresh_token')
  @ApiOperation({ summary: 'Creates new pair of tokens' })
  @ApiOkResponse({ type: TokensDto })
  refreshToken(@Headers() headers: Request['headers']): Promise<TokensDto> {
    const { authorization } = headers;
    if (!authorization) throw new UnauthorizedException();
    const [tokenName, refreshToken] = authorization.split(' ');
    if (tokenName !== 'Bearer' || !refreshToken)
      throw new UnauthorizedException();

    return this.authService.refresh(refreshToken);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Redirects to google client' })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  google(): void {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Returns auth tokens using google oAuth credentials',
  })
  @ApiOkResponse({ type: TokensDto })
  googleCallback(@Req() req: Request): Promise<TokensDto> {
    const googleData = req.user as TGoogleUserData;
    return this.authService.authGoogle(googleData);
  }
}
