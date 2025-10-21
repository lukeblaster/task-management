import { Body, Controller, Logger, Param, Query, Req } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateNotificationUseCase } from 'src/app/use-cases/notification/create-comment.use-case';
import { CreateNotificationDto } from '../dto/comment/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
  ) {}

  @EventPattern('task.created')
  async readComments(@Payload() payload: CreateNotificationDto) {
    const { title, body, taskId, userId } = payload;
    await this.createNotificationUseCase.execute({
      title,
      body,
      taskId,
      userId,
    });
  }

  // @MessagePattern('comment.create')
  // async createComment(@Body() body: CreateCommentDto) {
  //   const { userId, content, taskId } = body;

  //   const comment = await this.createCommentUseCase.execute({
  //     content,
  //     taskId,
  //     authorId: userId,
  //   });

  //   if (!comment) return { message: 'Não foi possível criar o comentário.' };

  //   return { comment: comment, message: 'Comentário criado com sucesso.' };
  // }
}
