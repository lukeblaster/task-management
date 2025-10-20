import { Injectable } from '@nestjs/common';

import { TaskRepository } from 'src/domain/repositories/task.repository';
import {
  EnumStatus,
  Task,
  TaskPriority,
} from 'src/domain/entities/task.entity';

export interface ReadTaskUseCaseRequest {
  userId: string;
}

@Injectable()
export class ReadTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ userId }: ReadTaskUseCaseRequest): Promise<Task[] | null> {
    const tasks = await this.taskRepository.findByUserId(userId);

    return tasks;
  }
}
