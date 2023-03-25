import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionEntity } from './session.entity';
import { TimestampEntity } from './timestamp.entity';
import { UserEntity } from './user.entity';

@Entity('campaign')
export class CampaignEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  owner: UserEntity;

  @OneToMany(() => SessionEntity, ({ campaign }) => campaign, { eager: true })
  sessions: SessionEntity[];
}
