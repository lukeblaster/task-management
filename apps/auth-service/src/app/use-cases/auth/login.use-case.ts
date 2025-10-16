import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';

import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface LoginUseCaseRequest {
  email: string;
  password: string;
}

export interface LoginUseCaseResponse {
  access_token: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new ForbiddenException();

    const isPasswordCorrect = compare(user?.password, password);

    if (!isPasswordCorrect) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };
    const jwt = await this.jwtService.signAsync(payload);

    console.log(jwt);

    return { access_token: jwt };
  }
}
