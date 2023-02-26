import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignEntity } from '../../database/entities/campaign.entity';
import { SessionEntity } from '../../database/entities/session.entity';
import { SessionService } from './session.service';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity, SessionEntity])],
  controllers: [CampaignController],
  providers: [CampaignService, SessionService],
})
export class CampaignModule {}
