import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';

import { User } from 'src/domain/entities/user.entity';
import { UserService } from 'src/domain/services/user.service';

export interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const emailAlreadyExists = await this.userService.checkIfEmailExists(email);

    if (emailAlreadyExists) {
      throw new Error('Email already in use.');
    }

    const user = User.create({ name, email, password });
    await this.userRepository.create(user);

    return { user };
  }
}
