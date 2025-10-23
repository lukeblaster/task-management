import { Task } from 'src/domain/entities/task.entity';

export class TaskPresenter {
  static toHTTP(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      authorId: task.authorId,
      deadline: task.deadline,
      status: task.status,
      priority: task.priority,
      comments: task.comments,
      responsibles: task.responsibles,
    };
  }
}
