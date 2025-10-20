import { Injectable } from '@nestjs/common';

import { TaskRepository } from 'src/domain/repositories/task.repository';
import {
  EnumStatus,
  Task,
  TaskPriority,
} from 'src/domain/entities/task.entity';

export interface ReadTaskUseCaseRequest {
  id: string;
}

@Injectable()
export class ReadTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ id }: ReadTaskUseCaseRequest): Promise<Task | null> {
    const task = await this.taskRepository.findById(id);

    return task;
  }
}
