import { Comment } from 'src/domain/entities/comment.entity';

export class CommentPresenter {
  static toHTTP(comment: Comment) {
    return {
      id: comment.id,
      content: comment.content,
      authorId: comment.authorId,
      createdAt: comment.createdAt,
    };
  }
}
