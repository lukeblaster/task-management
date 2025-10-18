import {
  ForbiddenException,
  Injectable,
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
    console.log(`🔐 Attempting login for email: ${email}`);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      console.log('❌ User not found for email:', email);
      throw new ForbiddenException('Usuário não encontrado');
    }

    console.log('✅ User found:', { id: user.id, email: user.email });
    console.log(
      'Hash salvo no banco (first 50 chars):',
      user.password.substring(0, 50) + '...',
    );
    console.log('Senha digitada length:', password.length);
    console.log('Senha digitada (com delimitadores):', `"${password}"`);

    try {
      // ✅ Verificando senha com Argon2
      console.log('🔄 Verifying password with Argon2...');
      const isPasswordCorrect = await argon.verify(user.password, password);
      console.log('✅ Senha correta?', isPasswordCorrect);

      if (!isPasswordCorrect) {
        console.log('❌ Password verification failed');
        throw new UnauthorizedException('Senha incorreta');
      }

      console.log('✅ Password verified successfully');

      // Gerar tokens
      console.log('🔄 Generating tokens...');
      const tokens = await this.authService.getTokens(user.id, user.email);

      // Atualizar refresh token no banco
      console.log('🔄 Updating refresh token in database...');
      await this.updateRtUseCase.execute({
        userId: user.id,
        refreshToken: tokens.refresh_token,
      });

      console.log('✅ Login completed successfully for user:', user.id);

      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };
    } catch (error) {
      console.error('💥 Error during login process:', error);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Erro durante a autenticação');
    }
  }
}
