import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateMapDto } from './create-map.dto';

export class UpdateMapDto extends PartialType(
  OmitType(CreateMapDto, ['campaignId']),
) {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
