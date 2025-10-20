import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { Response } from 'express';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { DeleteTaskDto } from '../dto/task/delete-task.dto';
import { AtAuthGuard } from 'src/domain/guards/at.guard';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';

@UseGuards(AtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(
    @Inject('TASK_SERVICE') private readonly taskClient: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('read')
  async read(@Req() req) {
    const response = await firstValueFrom(
      this.taskClient.send('comment.read', req.user.sub),
    );

    if (!response) return { message: 'Nenhuma tarefa encontrada.' };

    return response;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Req() req, @Body() body: CreateCommentDto) {
    const userId = req.user.sub;
    const response = await firstValueFrom(
      this.taskClient.send('comment.create', { userId, ...body }),
    );

    if (!response) return { message: 'Não foi possível criar o comentário.' };

    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    const response = await firstValueFrom(
      this.taskClient.send('task.update', { id, ...body }),
    );

    if (!response) return { message: 'Não foi possível atualizar a tarefa. ' };

    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  async deleteTask(@Param('id') id: DeleteTaskDto) {
    const response = await firstValueFrom(
      this.taskClient.send('task.delete', { id }),
    );
    return { message: 'Tarefa deletada com sucesso. ' };
  }
}
