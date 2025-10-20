import { Injectable } from '@nestjs/common';

import { TaskRepository } from 'src/domain/repositories/task.repository';
import {
  EnumStatus,
  Task,
  TaskPriority,
} from 'src/domain/entities/task.entity';

export interface DeleteTaskUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ id }: DeleteTaskUseCaseRequest): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
