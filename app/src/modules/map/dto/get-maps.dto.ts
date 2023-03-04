import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { PaginationDto } from '../../../dto/pagination.dto';

export class GetMapsDto extends PaginationDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  campaignId: number;
}
