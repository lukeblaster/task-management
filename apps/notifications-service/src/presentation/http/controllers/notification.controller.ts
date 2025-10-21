import { Body, Controller, Logger, Param, Query, Req } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateNotificationUseCase } from 'src/app/use-cases/notification/create-comment.use-case';
import { CreateNotificationDto } from '../dto/comment/create-notification.dto';
import { NotificationsGateway } from 'src/presentation/websocket/gateway/notification.gateway';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
    private readonly notificationGateway: NotificationsGateway,
  ) {}

  @EventPattern('task:created')
  async createNewTaskNotification(@Payload() payload: CreateNotificationDto) {
    const { body, taskId, userId, resposibleId } = payload;
    const title = 'Uma tarefa foi criada!';
    await this.createNotificationUseCase.execute({
      title,
      body,
      taskId,
      userId,
    });

    this.notificationGateway.sendNotification(resposibleId, 'task:created', {
      title,
      body,
      taskId,
      userId,
    });
  }

  @EventPattern('task:updated')
  async createUpdatedTaskNotification(
    @Payload() payload: CreateNotificationDto,
  ) {
    const { body, taskId, userId, resposibleId } = payload;
    const title = 'Uma tarefa foi atualizada!';
    await this.createNotificationUseCase.execute({
      title,
      body,
      taskId,
      userId,
    });

    this.notificationGateway.sendNotification(resposibleId, 'task:updated', {
      title,
      body,
      taskId,
      userId,
    });
  }

  @EventPattern('comment:new')
  async createNotification(@Payload() payload: CreateNotificationDto) {
    const { body, taskId, userId, resposibleId } = payload;
    const title = 'Um comentário foi adicionado a uma de suas tarefas!';
    await this.createNotificationUseCase.execute({
      title,
      body,
      taskId,
      userId,
    });

    this.notificationGateway.sendNotification(resposibleId, 'comment:new', {
      title,
      body,
      taskId,
      userId,
    });
  }
}
