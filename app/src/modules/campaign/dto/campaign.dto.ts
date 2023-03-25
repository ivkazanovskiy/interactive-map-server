import { ApiProperty } from '@nestjs/swagger';
import { CampaignEntity } from '../../../database/entities/campaign.entity';

export class CampaignDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(campaignEntity: CampaignEntity) {
    this.id = campaignEntity.id;
    this.name = campaignEntity.name;
  }
}
