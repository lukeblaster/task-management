import { Comment } from '../entities/comment.entity';

export abstract class CommentRepository {
  abstract findByTaskId(taskId: string): Promise<Comment[] | null>;
  abstract create(Comment: Comment): Promise<void>;
  abstract update(Comment: Comment): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
