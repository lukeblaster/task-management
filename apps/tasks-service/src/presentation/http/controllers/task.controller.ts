import { Body, Controller, Inject, Logger, Param, Query } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskUseCase } from 'src/app/use-cases/task/create-tasks.use-case';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { UpdateTaskUseCase } from 'src/app/use-cases/task/update-tasks.use-case';
import { ReadTaskDto } from '../dto/task/read-tasks.dto';
import { DeleteTaskDto } from '../dto/task/delete-task.dto';
import { DeleteTaskUseCase } from 'src/app/use-cases/task/delete-tasks.use-case';
import { ReadTasksUseCase } from 'src/app/use-cases/task/read-tasks.use-case';
import { ReadTaskUseCase } from 'src/app/use-cases/task/read-task.use-case';
import { PaginationDto } from '../dto/pagination/pagination.dto';
import { TaskPresenter } from '../presenters/task.presenter';
import { CreateAuditLogUseCase } from 'src/app/use-cases/audit-log/create-audit-log.use-case';

@Controller('task')
export class TaskController {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly readTaskUseCase: ReadTaskUseCase,
    private readonly readTasksUseCase: ReadTasksUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly createAuditLogUseCase: CreateAuditLogUseCase,
  ) {}

  @MessagePattern('task.id')
  async readTask(@Payload() param: string) {
    console.log(param);

    const tasks = await this.readTaskUseCase.execute({
      id: param,
    });

    if (!tasks) return { message: 'Nenhuma tarefa encontrada.' };

    return TaskPresenter.toHTTP(tasks);
  }

  @MessagePattern('task.read')
  async readTasks(@Payload() payload: ReadTaskDto & PaginationDto) {
    const tasks = await this.readTasksUseCase.execute({
      userId: payload.userId,
      page: payload.page,
      size: payload.size,
    });

    if (!tasks) return { message: 'Nenhuma tarefa encontrada.' };

    const { data, page, lastPage, total } = tasks;
    const presentedTasks = data.map((task) => TaskPresenter.toHTTP(task));

    return { data: presentedTasks, page, lastPage, total };
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

    console.log(body);

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

    await this.createAuditLogUseCase.execute({
      authorId,
      taskId: task.id,
      message: 'criou a tarefa.',
    });

    task.responsibles?.forEach((element) => {
      this.notificationClient.emit('task:created', {
        body: `${title.substring(0, 20)}`,
        taskId: task.id,
        userId: task.authorId,
        resposibleId: element,
      });
    });

    return { task, message: 'Tarefa criada com sucesso.' };
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

    task.responsibles?.forEach((element) => {
      this.notificationClient.emit('task:updated', {
        body: `${title.substring(0, 20)}`,
        taskId: task.id,
        userId: task.authorId,
        resposibleId: element,
      });
    });

    await this.createAuditLogUseCase.execute({
      authorId: task.authorId,
      taskId: task.id,
      message: 'atualizou esta tarefa.',
    });

    if (!task) return { message: 'Não foi possível atualizar a tarefa.' };

    return { task, message: 'Tarefa atualizada com sucesso.' };
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
