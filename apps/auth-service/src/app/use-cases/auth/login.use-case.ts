import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';

import * as argon from 'argon2';
import { AuthService } from 'src/domain/services/auth.service';
import { UpdateRtUseCase } from './update-rt.use-case';

export interface LoginUseCaseRequest {
  email: string;
  password: string;
}

export interface LoginUseCaseResponse {
  user: { username: string; email: string };
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly updateRtUseCase: UpdateRtUseCase,
  ) {}

  async execute({
    email,
    password,
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    Logger.debug(`🔐 Attempting login for email: ${email}`);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      Logger.debug('❌ User not found for email:', email);
      throw new ForbiddenException('Usuário não encontrado');
    }

    Logger.debug('✅ User found:', { id: user.id, email: user.email });

    try {
      const isPasswordCorrect = await argon.verify(user.password, password);

      if (!isPasswordCorrect) {
        Logger.log('❌ Password verification failed');
        throw new UnauthorizedException('Senha incorreta');
      }

      Logger.debug('✅ Password verified successfully');

      Logger.debug('🔄Generating tokens...');
      const tokens = await this.authService.getTokens(user.id, user.email);

      Logger.debug('🔄Updating refresh token in database...');
      await this.updateRtUseCase.execute({
        userId: user.id,
        refreshToken: tokens.refresh_token,
      });

      Logger.debug('✅ Login completed successfully for user:', user.id);

      return {
        user: { username: user.username, email: user.email },
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };
    } catch (error) {
      Logger.error('💥 Error during login process:', error);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Erro durante a autenticação');
    }
  }
}
