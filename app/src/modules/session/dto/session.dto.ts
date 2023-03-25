import { ApiProperty } from '@nestjs/swagger';
import { SessionEntity } from '../../../database/entities/session.entity';

export class SessionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(sessionEntity: SessionEntity) {
    this.id = sessionEntity.id;
    this.name = sessionEntity.name;
  }
}
