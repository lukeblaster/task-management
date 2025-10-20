import { Body, Controller, Logger, Param, Query, Req } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { CreateCommentUseCase } from 'src/app/use-cases/comment/create-comment.use-case';
import { ReadCommentUseCase } from 'src/app/use-cases/comment/read-comment.use-case';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly readCommentUseCase: ReadCommentUseCase,
  ) {}

  @MessagePattern('comment.read')
  async readComments(@Payload() param: string) {
    const comments = await this.readCommentUseCase.execute({
      taskId: param,
    });

    if (!comments) return { message: 'Nenhum comentário encontrada.' };

    return { comments };
  }

  @MessagePattern('comment.create')
  async createComment(@Body() body: CreateCommentDto) {
    const { userId, content, taskId } = body;

    const comment = await this.createCommentUseCase.execute({
      content,
      taskId,
      authorId: userId,
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
