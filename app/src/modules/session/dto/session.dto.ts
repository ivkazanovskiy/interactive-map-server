import { ApiProperty } from '@nestjs/swagger';
import { SessionEntity } from '../../../database/entities/session.entity';
import { UserToSessionEntity } from '../../../database/entities/user-to-session.entity';

class SessionUserListDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  isAccepted: boolean;

  constructor(userEntity: UserToSessionEntity) {
    // FIXME: use publicId instead of sequence
    this.id = userEntity.user.id;
    this.isAccepted = userEntity.isAccepted;
  }
}
export class SessionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [SessionUserListDto] })
  userList: SessionUserListDto[];

  constructor(sessionEntity: SessionEntity) {
    this.id = sessionEntity.id;
    this.name = sessionEntity.name;
    this.userList = sessionEntity.userToSession.map(
      (e) => new SessionUserListDto(e),
    );
  }
}
