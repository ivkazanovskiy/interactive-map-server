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
        synchronize: false,
        ...config.postgresConnection,
        logging: !!config.app.isProd, // if NODE_ENV is prod, we hide query logs
        entities: [path.join(__dirname, '../../database/entities/*.entity.*s')],
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresConnectionModule {}
