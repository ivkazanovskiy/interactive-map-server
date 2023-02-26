import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
