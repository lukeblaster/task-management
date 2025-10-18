import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { AuthService } from 'src/domain/services/auth.service';
import { UpdateRtUseCase } from './update-rt.use-case';
import { DecodeTokenUseCase } from './decode-token.use-case';
import * as argon from 'argon2';

export interface RefreshTokenUseCaseRequest {
  refreshToken: string;
}

export interface RefreshTokenUseCaseResponse {
  tokens: RefreshTokens;
  userData: UserData;
}

type RefreshTokens = {
  access_token?: string;
  refresh_token?: string;
};

type UserData = {
  sub: string;
  email: string;
};

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly updateRtUseCase: UpdateRtUseCase,
    private readonly decodeTokenUseCase: DecodeTokenUseCase,
  ) {}

  async execute({
    refreshToken,
  }: RefreshTokenUseCaseRequest): Promise<RefreshTokenUseCaseResponse> {
    const payload = await this.decodeTokenUseCase.execute({
      token: refreshToken,
    });

    if (!payload) throw new UnauthorizedException();

    const user = await this.userRepository.findById(payload.sub);

    if (!user) throw new ForbiddenException();

    const rtMatches = await argon.verify(user.hashedRt, refreshToken);

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.authService.getTokens(user.id, user.email);
    await this.updateRtUseCase.execute({
      userId: user.id,
      refreshToken: tokens.refresh_token,
    });

    return { tokens, userData: { email: user.email, sub: user.id } };
  }
}
