import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import {
  EnumStatus,
  Task,
  TaskPriority,
} from 'src/domain/entities/task.entity';
import { TaskTypeOrmEntity } from '../entities/task.typeorm-entity';
import { PaginationResult } from 'src/type/pagination-result.interface';
import { AuditLogRepository } from 'src/domain/repositories/audit-log.repository';
import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { AuditLogOrmEntity } from '../entities/audit-log.typeorm-entity';

@Injectable()
export class TypeOrmAuditLogRepository implements AuditLogRepository {
  constructor(
    @InjectRepository(AuditLogOrmEntity)
    private readonly typeOrmRepository: Repository<AuditLogOrmEntity>,
  ) {}

  async findByTaskId(
    taskId: string,
    page: number = 1,
    size: number = 10,
  ): Promise<PaginationResult<AuditLog> | null> {
    const [auditLogEntities, total] = await this.typeOrmRepository.findAndCount(
      {
        where: {
          taskId: taskId,
        },
        relations: ['task'],
        order: {
          createdAt: 'ASC',
        },
        skip: (page - 1) * size,
        take: size,
      },
    );

    if (auditLogEntities.length === 0) {
      return null;
    }

    const auditLogs = auditLogEntities.map((auditLog) =>
      this.toDomain(auditLog),
    );

    return {
      data: auditLogs,
      total,
      page,
      lastPage: Math.ceil(total / size),
    };
  }

  async create(auditLog: AuditLog): Promise<void> {
    const auditLogEntity = this.toTypeOrmEntity(auditLog);
    await this.typeOrmRepository.save(auditLogEntity);
  }

  async delete(id: string): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }

  private toDomain(entity: AuditLogOrmEntity): AuditLog {
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

    return AuditLog.create(
      {
        message: entity.message,
        task: task,
        authorId: entity.authorId,
        taskId: entity.taskId,
        createdAt: entity.createdAt,
      },
      entity.id,
    );
  }

  private toTypeOrmEntity(domain: AuditLog): AuditLogOrmEntity {
    const entity = new AuditLogOrmEntity();

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
    entity.message = domain.message;
    entity.authorId = domain.authorId;
    entity.taskId = domain.taskId;
    entity.createdAt = domain.createdAt;

    return entity;
  }
}
