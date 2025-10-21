import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationTypeOrmEntity } from '../entities/notification.typeorm-entity';
import { NotificationRepository } from 'src/domain/repositories/notification.repository';
import { NotificationEntity } from 'src/domain/entities/notification.entity';

@Injectable()
export class TypeOrmNotificationRepository implements NotificationRepository {
  constructor(
    @InjectRepository(NotificationTypeOrmEntity)
    private readonly typeOrmRepository: Repository<NotificationTypeOrmEntity>,
  ) {}

  // async create(
  //   taskId: string,
  //   page: number = 1,
  //   size: number = 10,
  // ): Promise<NotificationEntity | null> {
  //   const [commentEntities, total] = await this.typeOrmRepository.create({
  //     where: {
  //       taskId: taskId,
  //     },
  //     relations: ['task'],
  //     order: {
  //       createdAt: 'ASC',
  //     },
  //     skip: (page - 1) * size,
  //     take: size,
  //   });

  //   if (commentEntities.length === 0) {
  //     return null;
  //   }

  //   const comments = commentEntities.map((comment) => this.toDomain(comment));

  //   return {
  //     data: comments,
  //     total,
  //     page,
  //     lastPage: Math.ceil(total / size),
  //   };
  // }

  async create(notification: NotificationEntity): Promise<void> {
    const notificationentity = this.toTypeOrmEntity(notification);
    await this.typeOrmRepository.save(notificationentity);
  }

  // async update(comment: Comment): Promise<void> {
  //   const commentEntity = this.toTypeOrmEntity(comment);
  //   await this.typeOrmRepository.save(commentEntity);
  // }

  // async delete(id: string): Promise<void> {
  //   await this.typeOrmRepository.delete(id);
  // }

  private toDomain(entity: NotificationTypeOrmEntity): NotificationEntity {
    const notification = NotificationEntity.create(
      {
        title: entity.title,
        body: entity.body,
        taskId: entity.taskId,
        userId: entity.userId,
        read: entity.read,
        createdAt: entity.createdAt,
      },
      entity.id,
    );

    return notification;
  }

  private toTypeOrmEntity(
    domain: NotificationEntity,
  ): NotificationTypeOrmEntity {
    const entity = new NotificationTypeOrmEntity();

    entity.id = domain.id;
    entity.title = domain.title;
    entity.body = domain.body;
    entity.taskId = domain.taskId;
    entity.userId = domain.userId;
    entity.read = domain.read;
    entity.createdAt = domain.createdAt;

    return entity;
  }
}
