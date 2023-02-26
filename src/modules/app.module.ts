import { Module } from '@nestjs/common';
import { ConfigModule } from './other/config/config.module';
import { PostgresConnectionModule } from './other/postgres-connection.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { CampaignModule } from './campaign/campaign.module';
import { MapModule } from './map/map.module';

@Module({
  imports: [
    ConfigModule,
    PostgresConnectionModule,
    AuthModule,
    CampaignModule,
    MapModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
