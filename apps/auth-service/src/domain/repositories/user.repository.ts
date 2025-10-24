import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAllUsers(): Promise<User[] | null>;
  abstract create(User: User): Promise<void>;
  abstract update(User: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
