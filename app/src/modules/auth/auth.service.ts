import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from '../../database/entities/refresh-token.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { Config } from '../other/config/config.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { TokensDto } from './dto/tokens.dto';
import { UserRepository } from './repository/user.repo';
import { TGoogleUserData } from './types/google-user-data.type';
import { TJWTPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: Config,
    private readonly userRepo: UserRepository,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepo: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    return this.userRepo.login({ email, password });
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userRepo.signUp(signUpDto);
    if (!user) throw new BadRequestException();
    return this.getTokens(user);
  }

  async login(loginDto: LoginDto): Promise<TokensDto> {
    const user = await this.userRepo.login(loginDto);
    if (!user) throw new UnauthorizedException();
    return this.getTokens(user);
  }

  async signOut(refreshToken: string): Promise<void> {
    const token = await this.refreshTokenRepo.findOneOrFail({
      where: { token: refreshToken },
    });

    await this.refreshTokenRepo.delete({ id: token.id });
  }

  async refresh(refreshToken: string): Promise<TokensDto> {
    const token = await this.refreshTokenRepo.findOne({
      where: { token: refreshToken },
    });

    if (!token) throw new ForbiddenException();

    const tokens = await this.getTokens(token.user);

    await this.refreshTokenRepo.delete({ id: token.id });
    return tokens;
  }

  private async getTokens(user: UserEntity): Promise<TokensDto> {
    // TODO: set correct payload for both tokens
    const payload: TJWTPayload = { id: user.id };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.jwt.refreshTokenExpiresIn,
    });

    await this.refreshTokenRepo.insert({ token: refreshToken, user });

    return new TokensDto({
      accessToken,
      refreshToken,
    });
  }

  async authGoogle(googleUserData: TGoogleUserData): Promise<TokensDto> {
    const user = await this.userRepo.googleAuth(googleUserData);
    if (!user) throw new UnauthorizedException();
    return this.getTokens(user);
  }
}
