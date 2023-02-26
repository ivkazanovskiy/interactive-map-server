import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Session } from './session.entity';
import { TimestampEntity } from './timastamp.entity';
import { User } from './user.entity';

@Entity()
export class Campaign extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  owner: User;

  @OneToMany(() => Session, ({ campaign }) => campaign, { eager: true })
  sessions: Session[];
}
