import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';

import { compare } from 'bcrypt';
import { UserPresenter } from 'src/presentation/http/presenters/user.presenter';

export interface ValidateUserUseCaseRequest {
  email: string;
  password: string;
}

export interface ValidateUserUseCaseResponse {
  user: UserPresenter;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: ValidateUserUseCaseRequest): Promise<ValidateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new ForbiddenException();

    const isPasswordCorrect = compare(user?.password, password);

    if (!isPasswordCorrect) throw new UnauthorizedException();

    return { user: UserPresenter.toHTTP(user) };
  }
}
