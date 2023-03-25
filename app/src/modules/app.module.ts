import { Module } from '@nestjs/common';
import { ConfigModule } from './other/config/config.module';
import { PostgresConnectionModule } from './other/postgres-connection.module';
import { AuthModule } from './auth/auth.module';
import { CampaignModule } from './campaign/campaign.module';
import { MapModule } from './map/map.module';
import { SocketModule } from './socket/socket.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '..', 'client'),
    // }),
    ConfigModule,
    PostgresConnectionModule,
    AuthModule,
    CampaignModule,
    MapModule,
    SocketModule,
    ProfileModule,
  ],
})
export class AppModule {}
