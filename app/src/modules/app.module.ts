import { Module } from '@nestjs/common';
import { ConfigModule } from './other/config/config.module';
import { PostgresConnectionModule } from './other/postgres-connection.module';
import { AuthModule } from './auth/auth.module';
import { CampaignModule } from './campaign/campaign.module';
import { MapModule } from './map/map.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule,
    PostgresConnectionModule,
    AuthModule,
    CampaignModule,
    MapModule,
    SocketModule,
  ],
})
export class AppModule {}
