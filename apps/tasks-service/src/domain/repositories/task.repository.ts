import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract findByUserId(userId: string): Promise<Task[] | null>;
  abstract create(Task: Task): Promise<void>;
  abstract update(Task: Task): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
