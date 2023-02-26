import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { TimestampEntity } from './timastamp.entity';

// FIXME: add constraint: OR password IS NULL OR google_id IS NULL
@Entity('user')
export class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  password: string | null;

  @OneToMany(() => RefreshTokenEntity, ({ user }) => user)
  refreshTokens: RefreshTokenEntity[];

  @Column({ name: 'google_id', nullable: true, type: 'varchar' })
  googleId: string | null;
}
