import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';

import { User } from 'src/domain/entities/user.entity';
import { UserService } from 'src/domain/services/user.service';

import { hash, genSalt } from 'bcrypt';

export interface CreateUserUseCaseRequest {
  username: string;
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
    username,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const emailAlreadyExists = await this.userService.checkIfEmailExists(email);

    if (emailAlreadyExists) {
      throw new Error('Email already in use.');
    }

    const salt = await genSalt();
    const hashPassword = await hash(password, salt);

    const user = User.create({ username, email, password: hashPassword });
    await this.userRepository.create(user);

    return { user };
  }
}
