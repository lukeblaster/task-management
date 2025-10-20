import { Injectable } from '@nestjs/common';

import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { Comment } from 'src/domain/entities/comment.entity';

export interface ReadCommentUseCaseRequest {
  taskId: string;
}

@Injectable()
export class ReadCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute({
    taskId,
  }: ReadCommentUseCaseRequest): Promise<Comment[] | null> {
    const comments = await this.commentRepository.findByTaskId(taskId);

    return comments;
  }
}
