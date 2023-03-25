import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CampaignIdDto } from '../../../dto/campaign-id.dto';

export class CreateMapDto extends CampaignIdDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
