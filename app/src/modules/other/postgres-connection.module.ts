import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config/config.service';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [Config],
      useFactory: async (
        config: Config,
      ): Promise<PostgresConnectionOptions> => ({
        type: 'postgres',
        synchronize: true,
        ...config.postgresConnection,
        logging: true,
        entities: [path.join(__dirname, '../../database/entities/*.entity.*s')],
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresConnectionModule {}
