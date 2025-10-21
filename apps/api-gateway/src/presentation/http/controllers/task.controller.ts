import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
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
import { PaginationDto } from '../dto/pagination/pagination.dto';

@UseGuards(AtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('TASK_SERVICE') private readonly taskClient: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async readById(@Param('id') id: string) {
    console.log(id);
    const response = await firstValueFrom(this.taskClient.send('task.id', id));

    if (!response) return { message: 'Nenhuma tarefa encontrada.' };

    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  async read(@Query() pagination: PaginationDto, @Req() req) {
    const response = await firstValueFrom(
      this.taskClient.send('task.read', {
        userId: req.user.sub,
        page: pagination.page,
        size: pagination.size,
      }),
    );

    if (!response) return { message: 'Nenhuma tarefa encontrada.' };

    return response;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async create(
    @Body() body: CreateTaskDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await firstValueFrom(
      this.taskClient.send('task.create', body),
    );

    if (!response) return { message: 'Não foi possível criar a tarefa. ' };

    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    const response = await firstValueFrom(
      this.taskClient.send('task.update', { id, ...body }),
    );

    if (!response) return { message: 'Não foi possível atualizar a tarefa. ' };

    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTask(@Param('id') id: DeleteTaskDto) {
    const response = await firstValueFrom(
      this.taskClient.send('task.delete', { id }),
    );
    return { message: 'Tarefa deletada com sucesso. ' };
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id/comments')
  async getComments(
    @Query() pagination: PaginationDto,
    @Param('id') id: string,
  ) {
    const response = await firstValueFrom(
      this.taskClient.send('comment.read', {
        taskId: id,
        page: pagination.page,
        size: pagination.size,
      }),
    );

    if (!response) return { message: 'Nenhum comentário encontrada.' };

    return response;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':id/comments')
  async createComment(
    @Req() req,
    @Body() body: CreateCommentDto,
    @Param('id') id: string,
  ) {
    const { content } = body;
    const userId = req.user.sub;
    const response = await firstValueFrom(
      this.taskClient.send('comment.create', { userId, taskId: id, content }),
    );

    if (!response) return { message: 'Não foi possível criar o comentário.' };

    return response;
  }
}
