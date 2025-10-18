import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';

import { User } from 'src/domain/entities/user.entity';
import { UserService } from 'src/domain/services/user.service';

import * as argon from 'argon2';
import { AuthService } from 'src/domain/services/auth.service';

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
    private readonly authService: AuthService,
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

    const hashPassword = await argon.hash(password);

    const user = User.create({ username, email, password: hashPassword });

    const tokens = await this.authService.getTokens(user.id, user.email);
    user.hashedRt = await argon.hash(tokens.refresh_token);

    await this.userRepository.create(user);

    console.log(user);

    return { user };
  }
}
