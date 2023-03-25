import { ApiProperty } from '@nestjs/swagger';
import { ErrorMessage } from '../types/error-messages.enum';

export class ErrorDto {
  @ApiProperty()
  code: string;

  @ApiProperty({ type: [String] })
  description: string[];

  constructor({
    code,
    description,
  }: {
    code?: string;
    description?: string[];
  }) {
    if (code && code in ErrorMessage) {
      this.code = code;
    }

    if (description) {
      // skip description if it is code
      if (typeof description === 'string' && !(description in ErrorMessage)) {
        this.description = description;
      }

      if (Array.isArray(description)) {
        this.description = description;
      }
    }
  }
}
