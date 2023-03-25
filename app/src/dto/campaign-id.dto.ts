import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CampaignIdDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  campaignId: number;
}
