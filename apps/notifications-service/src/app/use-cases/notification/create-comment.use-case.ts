import { Injectable } from '@nestjs/common';
import { NotificationEntity } from 'src/domain/entities/notification.entity';
import { NotificationRepository } from 'src/domain/repositories/notification.repository';

export interface CreateNotificationUseCaseRequest {
  title: string;
  body: string;
  userId: string;
  taskId: string;
}

@Injectable()
export class CreateNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    title,
    body,
    userId,
    taskId,
  }: CreateNotificationUseCaseRequest): Promise<NotificationEntity> {
    const notification = NotificationEntity.create({
      title,
      body,
      userId,
      taskId,
    });

    await this.notificationRepository.create(notification);

    return notification;
  }
}
