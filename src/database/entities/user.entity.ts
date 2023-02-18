import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RefreshToken } from './refresh-token.entity';

// FIXME: add constraint: OR password IS NULL OR google_id IS NULL
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  password: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({
    name: 'deleted_at',
    default: () => 'NULL',
    nullable: true,
  })
  deletedAt: Date;

  @OneToMany(() => RefreshToken, ({ user }) => user)
  refreshTokens: RefreshToken[];

  @Column({ name: 'google_id', nullable: true, type: 'varchar' })
  googleId: string | null;
}
