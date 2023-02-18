import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  constructor(data: TokensDto) {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  }
}
