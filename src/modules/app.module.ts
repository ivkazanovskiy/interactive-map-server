import { Module } from '@nestjs/common';
import { ConfigModule } from './other/config/config.module';
import { PostgresConnectionModule } from './other/postgres-connection.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, PostgresConnectionModule, AuthModule],
})
export class AppModule {}
