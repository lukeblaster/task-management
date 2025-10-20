import { Body, Controller, Logger, Param, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskUseCase } from 'src/app/use-cases/task/create-tasks.use-case';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { UpdateTaskUseCase } from 'src/app/use-cases/task/update-tasks.use-case';
import { ReadTaskDto } from '../dto/task/read-tasks.dto';
import { DeleteTaskDto } from '../dto/task/delete-task.dto';
import { DeleteTaskUseCase } from 'src/app/use-cases/task/delete-tasks.use-case';
import { ReadTasksUseCase } from 'src/app/use-cases/task/read-tasks.use-case';
import { ReadTaskUseCase } from 'src/app/use-cases/task/read-task.use-case';

@Controller('task')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly readTaskUseCase: ReadTaskUseCase,
    private readonly readTasksUseCase: ReadTasksUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @MessagePattern('task.id')
  async readTask111(@Payload() param: string) {
    console.log(param);

    const tasks = await this.readTaskUseCase.execute({
      id: param,
    });

    if (!tasks) return { message: 'Nenhuma tarefa encontrada.' };

    return { tasks };
  }

  @MessagePattern('task.read')
  async readTasks(@Payload() param: string) {
    console.log(param);

    const tasks = await this.readTasksUseCase.execute({
      userId: param,
    });

    if (!tasks) return { message: 'Nenhuma tarefa encontrada.' };

    return { tasks };
  }

  @MessagePattern('task.create')
  async createTask(@Body() body: CreateTaskDto) {
    const {
      title,
      description,
      deadline,
      responsibles,
      priority,
      status,
      authorId,
    } = body;

    const task = await this.createTaskUseCase.execute({
      title: title,
      description: description,
      deadline: deadline,
      authorId: authorId,
      responsibles: responsibles,
      priority: priority,
      status: status,
    });

    if (!task) return { message: 'Não foi possível criar a tarefa.' };

    return { task: task, message: 'Tarefa criada com sucesso.' };
  }

  @MessagePattern('task.update')
  async updateTask(@Body() body: UpdateTaskDto) {
    const { id, title, description, deadline, responsibles, priority, status } =
      body;

    const task = await this.updateTaskUseCase.execute({
      id: id,
      title: title,
      description: description,
      deadline: deadline,
      responsibles: responsibles,
      priority: priority,
      status: status,
    });

    if (!task) return { message: 'Não foi possível atualizar a tarefa.' };

    return { task: task, message: 'Tarefa atualizada com sucesso.' };
  }

  @MessagePattern('task.delete')
  async deleteTask(@Payload() payload: DeleteTaskDto) {
    const { id } = payload;

    await this.deleteTaskUseCase.execute({
      id: id,
    });

    return { message: 'Tarefa deletada com sucesso.' };
  }
}
