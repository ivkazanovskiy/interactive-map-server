import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CampaignEntity } from './campaign.entity';
import { TimestampEntity } from './timastamp.entity';
import { UserToSessionEntity } from './user-to-session.entity';

@Entity('session')
export class SessionEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CampaignEntity)
  @JoinColumn({ name: 'campaign_id', referencedColumnName: 'id' })
  campaign: CampaignEntity;

  @OneToMany(() => UserToSessionEntity, ({ session }) => session, {
    eager: true,
  })
  public userToSession: UserToSessionEntity[];
}
