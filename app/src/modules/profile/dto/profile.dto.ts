import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../database/entities/user.entity';

export class ProfileDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  id: number; // TODO: create public id
  constructor(user: UserEntity) {
    this.username = user.username;
    this.id = user.id;
  }
}
