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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { UserEntity } from '../../database/entities/user.entity';
import { GetUser } from '../../decorators/get-user.decorator';
import { JwtGuard } from '../../guards/jwt-guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { TGoogleUserData } from './types/google-user-data.type';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    console.log(signUpDto);

    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // TODO: make sure it is okay to pass refresh token in header
  @Post('refresh')
  @ApiBearerAuth('refresh_token')
  refreshToken(@Headers() headers: Request['headers']) {
    const { authorization } = headers;
    if (!authorization) throw new UnauthorizedException();
    const [tokenName, refreshToken] = authorization.split(' ');
    if (tokenName !== 'Bearer' || !refreshToken)
      throw new UnauthorizedException();

    return this.authService.refresh(refreshToken);
  }

  // TODO: remove this endpoint when frontend is ready to use user entity
  @Get()
  @ApiOperation({ summary: 'temporary access token check' })
  @ApiBearerAuth('access_token')
  @UseGuards(JwtGuard)
  check(@GetUser() user: UserEntity): void {
    return;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  google() {
    // redirect to google client
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req: Request) {
    const googleData = req.user as TGoogleUserData;
    return this.authService.authGoogle(googleData);
  }
}
