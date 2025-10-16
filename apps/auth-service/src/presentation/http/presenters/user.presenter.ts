import { User } from '../../../domain/entities/user.entity';

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
