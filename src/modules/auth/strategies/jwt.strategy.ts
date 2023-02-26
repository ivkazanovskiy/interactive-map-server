import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../../database/entities/user.entity';
import { Config } from '../../other/config/config.service';
import { UserRepository } from '../repository/user.repo';
import { TJWTPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private config: Config,
  ) {
    super({
      secretOrKey: config.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // special name used for 'AuthGuard()'
  async validate(payload: TJWTPayload): Promise<UserEntity> {
    const { id } = payload;
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
