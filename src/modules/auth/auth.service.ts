import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRepository } from './repository/user.repo';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}

  signUp(signUpDto: SignUpDto) {
    return this.userRepo.signUp(signUpDto);
  }

  login(loginDto: LoginDto) {}
}
