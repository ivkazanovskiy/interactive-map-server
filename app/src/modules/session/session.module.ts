import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from '../../database/entities/session.entity';
import { SessionService } from './session.service';
import { CampaignService } from '../campaign/campaign.service';
import { CampaignEntity } from '../../database/entities/campaign.entity';
import { UserToSessionEntity } from '../../database/entities/user-to-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SessionEntity,
      CampaignEntity,
      UserToSessionEntity,
    ]),
  ],
  controllers: [SessionController],
  providers: [SessionService, CampaignService],
})
export class SessionModule {}
