import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import * as argon from 'argon2';

export interface UpdateRtUseCaseRequest {
  userId: string;
  refreshToken: string;
}

@Injectable()
export class UpdateRtUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    userId,
    refreshToken,
  }: UpdateRtUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new ForbiddenException();

    const hashedRt = await argon.hash(refreshToken);
    user.hashedRt = hashedRt;

    await this.userRepository.update(user);
  }
}
