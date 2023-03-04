import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repo';
import { UserEntity } from '../../database/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { Config } from '../other/config/config.service';
import { RefreshTokenEntity } from '../../database/entities/refresh-token.entity';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [Config],
      useFactory: (config: Config) => ({
        secret: config.jwt.secret,
        signOptions: { expiresIn: config.jwt.accessTokenExpiresIn },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy, GoogleOauthStrategy],
})
export class AuthModule {}
