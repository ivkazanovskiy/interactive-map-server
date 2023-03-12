import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Config } from './modules/other/config/config.service';
dotenv.config();

const config = new Config(new ConfigService());
export default new DataSource({
  type: 'postgres',
  ...config.postgresConnection,
  entities: [path.join(__dirname, './database/entities/*.entity.*s')],
  migrations: [path.join(__dirname, './database/migrations/*.*s')],
});
