import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignEntity } from '../../database/entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity])],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
