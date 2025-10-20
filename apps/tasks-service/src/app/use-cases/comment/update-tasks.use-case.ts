import { Injectable } from '@nestjs/common';

import { TaskRepository } from 'src/domain/repositories/task.repository';
import {
  EnumStatus,
  Task,
  TaskPriority,
} from 'src/domain/entities/task.entity';

export interface UpdateTaskUseCaseRequest {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  responsibles?: Array<string>;
  status?: EnumStatus;
  priority?: TaskPriority;
}

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    id,
    title,
    description,
    deadline,
    responsibles,
    status,
    priority,
  }: UpdateTaskUseCaseRequest): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new Error('Tarefa não encontrada');
    }

    task.title = title;
    task.description = description;
    task.deadline = deadline;
    task.responsibles = responsibles ?? task.responsibles;
    task.status = status ?? (task.status as EnumStatus);
    task.priority = priority ?? (task.priority as TaskPriority);

    await this.taskRepository.update(task);

    return task;
  }
}
