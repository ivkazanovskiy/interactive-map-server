import { Module } from '@nestjs/common';
import { ConfigModule } from './other/config/config.module';
import { PostgresConnectionModule } from './other/postgres-connection.module';

@Module({
  imports: [ConfigModule, PostgresConnectionModule],
})
export class AppModule {}
