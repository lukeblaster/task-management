import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommentTypeOrmEntity } from './comment.typeorm-entity';

enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

enum EnumStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

@Entity('tasks')
export class TaskTypeOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => CommentTypeOrmEntity, (comment) => comment.task, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: CommentTypeOrmEntity[];

  @Column({ type: 'date' })
  deadline: Date;

  @Column({ enum: TaskPriority, default: TaskPriority.LOW })
  priority: TaskPriority;

  @Column({ enum: EnumStatus, default: EnumStatus.TODO })
  status: EnumStatus;

  @Column('text', { array: true })
  responsibles: Array<string>;

  @Column()
  authorId: string;
}
