import { Injectable } from '@nestjs/common';
import { ArrayContains, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from 'src/domain/repositories/task.repository';
import { TaskTypeOrmEntity } from '../entities/task.typeorm-entity';
import {
  EnumStatus,
  Task,
  TaskPriority,
} from 'src/domain/entities/task.entity';
import { CommentTypeOrmEntity } from '../entities/comment.typeorm-entity';
import { Comment } from 'src/domain/entities/comment.entity';

@Injectable()
export class TypeOrmTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskTypeOrmEntity)
    private readonly typeOrmRepository: Repository<TaskTypeOrmEntity>,
  ) {}

  async findByUserId(id: string): Promise<Task[] | null> {
    const taskEntity = await this.typeOrmRepository.find({
      where: {
        responsibles: ArrayContains([id]),
      },
    });

    if (!taskEntity) {
      return null;
    }

    return taskEntity.map((task) => this.toDomain(task));
  }

  async create(task: Task): Promise<void> {
    const taskEntity = this.toTypeOrmEntity(task);
    await this.typeOrmRepository.save(taskEntity);
  }

  async update(task: Task): Promise<void> {
    const taskEntity = this.toTypeOrmEntity(task);
    await this.typeOrmRepository.save(taskEntity);
  }

  async delete(id: string): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }

  private toDomain(entity: TaskTypeOrmEntity): Task {
    const comments = entity.comments.map((comment) =>
      Comment.create(
        {
          authorId: comment.authorId,
          content: comment.content,
          task: task,
          taskId: comment.taskId,
          createdAt: comment.createdAt,
        },
        comment.id,
      ),
    );

    const task = Task.create(
      {
        title: entity.title,
        description: entity.description,
        priority: entity.priority,
        deadline: entity.deadline,
        status: entity.status,
        responsibles: entity.responsibles,
      },
      entity.id,
    );

    task.comments = comments;

    return task;
  }

  private toTypeOrmEntity(domain: Task): TaskTypeOrmEntity {
    const entity = new TaskTypeOrmEntity();
    entity.id = domain.id;
    entity.title = domain.title;
    entity.description = domain.description;
    entity.priority = domain.priority as TaskPriority;
    entity.deadline = domain.deadline;
    entity.status = domain.status as EnumStatus;
    entity.responsibles = domain.responsibles;

    return entity;
  }
}
