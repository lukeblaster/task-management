import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
