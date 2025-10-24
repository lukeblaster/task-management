import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { TaskTypeOrmEntity } from './task.typeorm-entity';

@Entity('comment')
export class CommentTypeOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => TaskTypeOrmEntity, (task) => task.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task: TaskTypeOrmEntity;

  @Column({ name: 'task_id' })
  taskId: string;

  @Column()
  authorName: string;

  @Column()
  authorId: string;

  @CreateDateColumn()
  createdAt: Date;
}
