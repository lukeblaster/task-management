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
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { Response } from 'express';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { ReadTaskDto } from '../dto/task/read-tasks.dto';
import { DeleteTaskDto } from '../dto/task/delete-task.dto';

@Controller('task')
export class TaskController {
  constructor(
    @Inject('TASK_SERVICE') private readonly taskClient: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('read/:userId')
  async read(@Param('userId') userId: ReadTaskDto) {
    if (!userId) return { message: 'Nenhuma tarefa encontrada.' };
    const response = await firstValueFrom(
      this.taskClient.send('task.read', userId),
    );

    if (!response) return { message: 'Nenhuma tarefa encontrada.' };

    return response;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
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
