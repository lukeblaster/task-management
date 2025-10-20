import { Injectable } from '@nestjs/common';

import { TaskRepository } from 'src/domain/repositories/task.repository';
import {
  EnumStatus,
  Task,
  TaskPriority,
} from 'src/domain/entities/task.entity';
import { PaginationResult } from 'src/type/pagination-result.interface';

export interface ReadTasksUseCaseRequest {
  userId: string;
  page: number;
  size: number;
}

@Injectable()
export class ReadTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    userId,
    page,
    size,
  }: ReadTasksUseCaseRequest): Promise<PaginationResult<Task> | null> {
    const tasks = await this.taskRepository.findByUserId(userId, page, size);

    return tasks;
  }
}
