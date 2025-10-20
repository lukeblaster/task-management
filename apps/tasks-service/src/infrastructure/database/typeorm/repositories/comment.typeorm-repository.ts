import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { CommentTypeOrmEntity } from '../entities/comment.typeorm-entity';
import { Comment } from 'src/domain/entities/comment.entity';
import {
  EnumStatus,
  Task,
  TaskPriority,
} from 'src/domain/entities/task.entity';
import { TaskTypeOrmEntity } from '../entities/task.typeorm-entity';
import { PaginationResult } from 'src/type/pagination-result.interface';

@Injectable()
export class TypeOrmCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentTypeOrmEntity)
    private readonly typeOrmRepository: Repository<CommentTypeOrmEntity>,
  ) {}

  async findByTaskId(
    taskId: string,
    page: number = 1,
    size: number = 10,
  ): Promise<PaginationResult<Comment> | null> {
    const [commentEntities, total] = await this.typeOrmRepository.findAndCount({
      where: {
        taskId: taskId,
      },
      relations: ['task'],
      order: {
        createdAt: 'ASC',
      },
      skip: (page - 1) * size,
      take: size,
    });

    if (commentEntities.length === 0) {
      return null;
    }

    const comments = commentEntities.map((comment) => this.toDomain(comment));

    return {
      data: comments,
      total,
      page,
      lastPage: Math.ceil(total / size),
    };
  }

  async create(comment: Comment): Promise<void> {
    const commentEntity = this.toTypeOrmEntity(comment);
    await this.typeOrmRepository.save(commentEntity);
  }

  async update(comment: Comment): Promise<void> {
    const commentEntity = this.toTypeOrmEntity(comment);
    await this.typeOrmRepository.save(commentEntity);
  }

  async delete(id: string): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }

  private toDomain(entity: CommentTypeOrmEntity): Comment {
    const task = Task.create(
      {
        title: entity.task.title,
        description: entity.task.description,
        deadline: entity.task.deadline,
        priority: entity.task.priority,
        authorId: entity.task.authorId,
        responsibles: entity.task.responsibles,
        status: entity.task.status,
      },
      entity.taskId,
    );

    return Comment.create(
      {
        content: entity.content,
        task: task,
        authorId: entity.authorId,
        taskId: entity.taskId,
        createdAt: entity.createdAt,
      },
      entity.id,
    );
  }

  private toTypeOrmEntity(domain: Comment): CommentTypeOrmEntity {
    const entity = new CommentTypeOrmEntity();

    if (domain.task) {
      const taskEntity = new TaskTypeOrmEntity();
      taskEntity.id = domain.task.id;
      taskEntity.title = domain.task.title;
      taskEntity.description = domain.task.description;
      taskEntity.authorId = domain.task.authorId;
      taskEntity.status = domain.task.status as EnumStatus;
      taskEntity.priority = domain.task.priority as TaskPriority;
      taskEntity.deadline = domain.task.deadline;
    }

    entity.id = domain.id;
    entity.content = domain.content;
    entity.authorId = domain.authorId;
    entity.taskId = domain.taskId;
    entity.createdAt = domain.createdAt;

    return entity;
  }
}
