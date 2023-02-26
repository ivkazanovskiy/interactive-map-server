import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CampaignEntity } from './campaign.entity';
import { TimestampEntity } from './timastamp.entity';

@Entity('session')
export class SessionEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CampaignEntity)
  @JoinColumn({ name: 'campaign_id', referencedColumnName: 'id' })
  campaign: CampaignEntity;
}
