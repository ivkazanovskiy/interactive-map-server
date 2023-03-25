import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class InvitedUserDto {
  @ApiProperty()
  @IsInt()
  id: number;
}
