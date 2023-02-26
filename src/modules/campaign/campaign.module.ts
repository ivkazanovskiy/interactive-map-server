import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from '../../database/entities/campaign.entity';
import { Session } from '../../database/entities/session.entity';
import { SessionService } from './session.service';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, Session])],
  controllers: [CampaignController],
  providers: [CampaignService, SessionService],
})
export class CampaignModule {}
