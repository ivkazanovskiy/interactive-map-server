import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';
import { PaginationRequestDto } from '../../../dto/pagination-request.dto';

export class GetMapsDto extends PaginationRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  campaignId: number;
}
