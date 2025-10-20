import { Injectable } from '@nestjs/common';

import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { Comment } from 'src/domain/entities/comment.entity';
import { PaginationResult } from 'src/type/pagination-result.interface';

export interface ReadCommentUseCaseRequest {
  taskId: string;
  page: number;
  size: number;
}

@Injectable()
export class ReadCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute({
    taskId,
    page,
    size,
  }: ReadCommentUseCaseRequest): Promise<PaginationResult<Comment> | null> {
    const comments = await this.commentRepository.findByTaskId(
      taskId,
      page,
      size,
    );

    return comments;
  }
}
