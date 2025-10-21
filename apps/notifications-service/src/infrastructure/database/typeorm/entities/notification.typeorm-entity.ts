import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('notification')
export class NotificationTypeOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  body: string;

  @Column()
  userId: string;

  @Column()
  taskId: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
