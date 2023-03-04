import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  // TODO: add validation rules
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  // TODO: add validation rules
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
