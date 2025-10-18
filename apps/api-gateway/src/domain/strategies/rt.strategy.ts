import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  Inject,
  UnauthorizedException,
  Logger,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { Strategy } from 'passport-custom';
import type { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
  private readonly logger = new Logger(RtStrategy.name);

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {
    super();
  }

  async validate(@Req() request: Request): Promise<any> {
    const token = request.cookies.refresh_token;

    if (!token) {
      throw new UnauthorizedException('Refresh token não fornecido');
    }

    if (!token || token.trim().length === 0) {
      throw new UnauthorizedException('Refresh token não pode estar vazio');
    }

    try {
      this.logger.debug(
        `📤 Enviando refresh token para validação no Auth Service...`,
      );

      const response = await firstValueFrom(
        this.authClient
          .send('auth.refresh', {
            token: token,
            type: 'refresh',
          })
          .pipe(timeout(5000)),
      );

      this.logger.debug(
        `📥 Resposta do Auth Service: ${JSON.stringify(response)}`,
      );

      if (!response.success) {
        this.logger.warn(`❌ Refresh token rejeitado: ${response.error}`);
        throw new UnauthorizedException(
          response.error || 'Refresh token inválido',
        );
      }

      this.logger.debug(
        `✅ Refresh token válido para usuário ID: ${response.userData.sub}`,
      );

      return {
        ...response.tokens,
      };
    } catch (error) {
      this.logger.error(
        `💥 Erro na validação do refresh token: ${error.message}`,
      );

      if (error.name === 'TimeoutError') {
        throw new UnauthorizedException('Serviço de autenticação indisponível');
      }

      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }
}
