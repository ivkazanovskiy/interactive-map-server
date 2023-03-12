import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CampaignEntity } from './campaign.entity';
import { TimestampEntity } from './timastamp.entity';

@Entity('map')
// FIXME: add correct constraint: one active map per campaign's session
// @Unique('active_map', ['campaign', 'isActive'] as (keyof MapEntity)[])
export class MapEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'is_active', default: () => 'FALSE' })
  isActive: boolean;

  @ManyToOne(() => CampaignEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaign_id', referencedColumnName: 'id' })
  campaign: CampaignEntity;
}
