import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty()
  code: string;

  constructor(code?: string) {
    if (code) this.code = code;
  }
}
