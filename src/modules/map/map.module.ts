import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapEntity } from '../../database/entities/map.entity';
import { CampaignEntity } from '../../database/entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MapEntity, CampaignEntity])],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
