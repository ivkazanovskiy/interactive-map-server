import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SessionEntity } from './session.entity';
import { EConstraint } from '../constraints.enum';

const uniqueColumnList: (keyof UserToSessionEntity)[] = ['user', 'session'];

@Entity('user_to_session')
@Unique(EConstraint.ONE_USER_PER_SESSION, uniqueColumnList)
export class UserToSessionEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public user: UserEntity;

  @ManyToOne(() => SessionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  public session: SessionEntity;

  @Column({ default: () => 'false' })
  public isAccepted: boolean;
}
