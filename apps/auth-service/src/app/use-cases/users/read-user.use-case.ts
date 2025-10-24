import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';

import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class ReadUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[] | null> {
    return await this.userRepository.findAllUsers();
  }
}
