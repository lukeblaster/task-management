import { PaginationResult } from 'src/type/pagination-result.interface';
import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract findById(id: string): Promise<Task | null>;
  abstract findByUserId(
    userId: string,
    page: number,
    size: number,
  ): Promise<PaginationResult<Task> | null>;
  abstract create(Task: Task): Promise<void>;
  abstract update(Task: Task): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
