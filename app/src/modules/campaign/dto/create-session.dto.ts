import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
