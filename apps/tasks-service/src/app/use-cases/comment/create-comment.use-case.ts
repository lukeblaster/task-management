import { Injectable } from '@nestjs/common';

import { TaskRepository } from 'src/domain/repositories/task.repository';
import { Comment } from 'src/domain/entities/comment.entity';
import { CommentRepository } from 'src/domain/repositories/comment.repository';

export interface CreateCommentUseCaseRequest {
  authorId: string;
  content: string;
  taskId: string;
}

@Injectable()
export class CreateCommentUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  async execute({
    authorId,
    content,
    taskId,
  }: CreateCommentUseCaseRequest): Promise<Comment> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) throw new Error('Task inválida');

    const comment = Comment.create({
      authorId,
      content,
      task,
      taskId,
    });

    await this.commentRepository.create(comment);

    return comment;
  }
}
