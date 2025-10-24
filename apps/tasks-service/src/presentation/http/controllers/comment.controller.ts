import {
  Body,
  Controller,
  Inject,
  Logger,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { CreateCommentUseCase } from 'src/app/use-cases/comment/create-comment.use-case';
import { ReadCommentUseCase } from 'src/app/use-cases/comment/read-comment.use-case';
import { ReadCommentsDto } from '../dto/comment/read-comment.dto';
import { PaginationDto } from '../dto/pagination/pagination.dto';
import { CommentPresenter } from '../presenters/comment.presenter';
import { CreateAuditLogUseCase } from 'src/app/use-cases/audit-log/create-audit-log.use-case';

@Controller('comment')
export class CommentController {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly readCommentUseCase: ReadCommentUseCase,
    private readonly createAuditLogUseCase: CreateAuditLogUseCase,
  ) {}

  @MessagePattern('comment.read')
  async readComments(@Payload() payload: ReadCommentsDto & PaginationDto) {
    console.log(payload);
    const comments = await this.readCommentUseCase.execute({
      taskId: payload.taskId,
      page: payload.page,
      size: payload.size,
    });

    if (!comments) return { message: 'Nenhum comentário encontrada.' };

    const { data, lastPage, page, total } = comments;

    const formattedComents = data.map((comment) =>
      CommentPresenter.toHTTP(comment),
    );

    return { data: formattedComents, lastPage, page, total };
  }

  @MessagePattern('comment.create')
  async createComment(@Body() body: CreateCommentDto) {
    const { userId, content, taskId } = body;

    const comment = await this.createCommentUseCase.execute({
      content,
      taskId,
      authorId: userId,
    });

    comment.task?.responsibles?.forEach((element) => {
      this.notificationClient.emit('comment:new', {
        body: `${comment.task?.title.substring(0, 20)}`,
        taskId: taskId,
        userId: userId,
        resposibleId: element,
      });
    });

    await this.createAuditLogUseCase.execute({
      authorId: userId,
      taskId,
      message: 'adicionou um comentário a esta tarefa.',
    });

    if (!comment) return { message: 'Não foi possível criar o comentário.' };

    return { comment: comment, message: 'Comentário criado com sucesso.' };
  }

  // @MessagePattern('task.update')
  // async updateTask(@Body() body: UpdateTaskDto) {
  //   const { id, title, description, deadline, responsibles, priority, status } =
  //     body;

  //   const task = await this.updateTaskUseCase.execute({
  //     id: id,
  //     title: title,
  //     description: description,
  //     deadline: deadline,
  //     responsibles: responsibles,
  //     priority: priority,
  //     status: status,
  //   });

  //   if (!task) return { message: 'Não foi possível atualizar a tarefa.' };

  //   return { task: task, message: 'Tarefa atualizada com sucesso.' };
  // }

  // @MessagePattern('task.delete')
  // async deleteTask(@Payload() payload: DeleteTaskDto) {
  //   const { id } = payload;

  //   await this.deleteTaskUseCase.execute({
  //     id: id,
  //   });

  //   return { message: 'Tarefa deletada com sucesso.' };
  // }
}
