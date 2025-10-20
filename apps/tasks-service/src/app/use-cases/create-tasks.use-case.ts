import { Injectable } from '@nestjs/common';

import { TaskRepository } from 'src/domain/repositories/task.repository';
import {
  EnumStatus,
  Task,
  TaskPriority,
} from 'src/domain/entities/task.entity';

export interface CreateTaskUseCaseRequest {
  title: string;
  description: string;
  deadline: Date;
  responsibles?: Array<string>;
  authorId: string;
  status?: EnumStatus;
  priority?: TaskPriority;
}

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    title,
    description,
    deadline,
    responsibles,
    authorId,
    status,
    priority,
  }: CreateTaskUseCaseRequest): Promise<Task> {
    const task = Task.create({
      title,
      description,
      deadline,
      responsibles: responsibles || [],
      authorId,
      status: status || EnumStatus.TODO,
      priority: priority || TaskPriority.LOW,
    });

    await this.taskRepository.create(task);

    return task;
  }
}
