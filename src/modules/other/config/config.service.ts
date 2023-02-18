/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export class Config {
  constructor(private configService: ConfigService) {}

  get app() {
    return {
      host: this.configService.get<string>('HOST')!,
      port: this.configService.get<number>('PORT')!,
    };
  }

  get postgresConnection(): Pick<
    PostgresConnectionOptions,
    'host' | 'port' | 'username' | 'password' | 'database'
  > {
    return {
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
    };
  }
}
