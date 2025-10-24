import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { TaskTypeOrmEntity } from './task.typeorm-entity';

@Entity('audit_log')
export class AuditLogOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => TaskTypeOrmEntity, (task) => task.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task: TaskTypeOrmEntity;

  @Column({ name: 'task_id' })
  taskId: string;

  @Column()
  authorId: string;

  @CreateDateColumn()
  createdAt: Date;
}
