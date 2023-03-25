import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CampaignIdDto } from '../../../dto/campaign-id.dto';

export class CreateSessionDto extends CampaignIdDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
