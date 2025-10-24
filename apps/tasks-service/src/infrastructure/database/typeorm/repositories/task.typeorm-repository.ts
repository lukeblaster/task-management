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
import { PaginationResult } from 'src/type/pagination-result.interface';
import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { AuditLogOrmEntity } from '../entities/audit-log.typeorm-entity';

@Injectable()
export class TypeOrmTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskTypeOrmEntity)
    private readonly typeOrmRepository: Repository<TaskTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Task | null> {
    const taskEntity = await this.typeOrmRepository.findOne({
      where: {
        id: id,
      },
      relations: ['comments', 'auditLog'],
    });

    if (!taskEntity) {
      return null;
    }

    return this.toDomain(taskEntity);
  }

  async findByUserId(
    userId: string,
    page: number = 1,
    size: number = 10,
  ): Promise<PaginationResult<Task> | null> {
    const [taskEntities, total] = await this.typeOrmRepository.findAndCount({
      where: [{ responsibles: ArrayContains([userId]) }, { authorId: userId }],
      relations: ['comments', 'auditLog'],
      skip: (page - 1) * size,
      take: size,
    });

    if (taskEntities.length === 0) {
      return null;
    }

    const tasks = taskEntities.map((task) => this.toDomain(task));

    return {
      data: tasks,
      total,
      page,
      lastPage: Math.ceil(total / size),
    };
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
    const task = Task.create(
      {
        title: entity.title,
        description: entity.description,
        priority: entity.priority,
        authorId: entity.authorId,
        deadline: entity.deadline,
        status: entity.status,
        responsibles: entity.responsibles,
        comments:
          entity.comments?.map((comment) =>
            Comment.create(
              {
                authorId: comment.authorId,
                content: comment.content,
                taskId: comment.taskId,
                createdAt: comment.createdAt,
              },
              comment.id,
            ),
          ) ?? [],
        auditLog:
          entity.auditLog?.map((auditLog) =>
            AuditLog.create(
              {
                message: auditLog.message,
                authorId: auditLog.authorId,
                taskId: auditLog.taskId,
                createdAt: auditLog.createdAt,
              },
              auditLog.id,
            ),
          ) ?? [],
      },
      entity.id,
    );

    return task;
  }

  private toTypeOrmEntity(domain: Task): TaskTypeOrmEntity {
    const entity = new TaskTypeOrmEntity();

    if (domain.comments.length > 0) {
      const comments = domain.comments?.map((comment) => {
        const commentEntity = new CommentTypeOrmEntity();
        commentEntity.id = comment.id;
        commentEntity.content = comment.content;
        commentEntity.authorId = comment.authorId;
        commentEntity.task = entity;
        commentEntity.taskId = comment.taskId;
        commentEntity.createdAt = comment.createdAt;
        return commentEntity;
      });

      entity.comments = comments;
    }

    if (domain.auditLog.length > 0) {
      const auditLogs = domain.auditLog?.map((auditLog) => {
        const auditLogEntity = new AuditLogOrmEntity();
        auditLogEntity.id = auditLog.id;
        auditLogEntity.message = auditLog.message;
        auditLogEntity.authorId = auditLog.authorId;
        auditLogEntity.task = entity;
        auditLogEntity.taskId = auditLog.taskId;
        auditLogEntity.createdAt = auditLog.createdAt;
        return auditLogEntity;
      });

      entity.auditLog = auditLogs;
    }

    entity.id = domain.id;
    entity.title = domain.title;
    entity.description = domain.description;
    entity.authorId = domain.authorId;
    entity.priority = domain.priority as TaskPriority;
    entity.deadline = domain.deadline;
    entity.status = domain.status as EnumStatus;
    entity.responsibles = domain.responsibles;

    return entity;
  }
}
