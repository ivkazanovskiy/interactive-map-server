/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export class Config {
  constructor(private configService: ConfigService) {}

  get app() {
    return {
      isProd:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
      host: this.configService.getOrThrow<string>('HOST'),
      port: this.configService.getOrThrow<number>('PORT'),
      globalPrefix: this.configService.getOrThrow<string>('GLOBAL_PREFIX'),
    };
  }

  get postgresConnection(): Pick<
    PostgresConnectionOptions,
    'host' | 'port' | 'username' | 'password' | 'database'
  > {
    return {
      host: this.configService.getOrThrow<string>('DB_HOST'),
      port: this.configService.getOrThrow<number>('DB_PORT'),
      username: this.configService.getOrThrow<string>('DB_USERNAME'),
      password: this.configService.getOrThrow<string>('DB_PASSWORD'),
      database: this.configService.getOrThrow<string>('DB_DATABASE'),
    };
  }

  get jwt() {
    return {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      accessTokenExpiresIn:
        this.configService.getOrThrow<string>('JWT_AT_EXPIRES'),
      refreshTokenExpiresIn:
        this.configService.getOrThrow<string>('JWT_RT_EXPIRES'),
    };
  }

  get oauth() {
    return {
      google: {
        clientId: this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
        clientSecret: this.configService.getOrThrow<string>(
          'GOOGLE_CLIENT_SECRET',
        ),
        callbackURL: this.configService.getOrThrow<string>(
          'GOOGLE_CALLBACK_URL',
        ),
      },
    };
  }
}
