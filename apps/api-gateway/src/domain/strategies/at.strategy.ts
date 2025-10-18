import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  Inject,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy, 'at-jwt') {
  private readonly logger = new Logger(AtJwtStrategy.name);

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {
    super();
  }

  async validate(request: any): Promise<any> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token de autorização não fornecido');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Formato do token inválido. Use: Bearer <token>',
      );
    }

    const token = authHeader.substring(7);

    if (!token || token.trim().length === 0) {
      throw new UnauthorizedException('Token não pode estar vazio');
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new UnauthorizedException('Formato do JWT inválido');
    }

    try {
      this.logger.debug(`📤 Enviando token para validação no Auth Service...`);

      const response = await firstValueFrom(
        this.authClient
          .send('auth.validate', {
            token,
            type: 'access',
          })
          .pipe(timeout(5000)),
      );

      this.logger.debug(
        `📥 Resposta do Auth Service: ${JSON.stringify(response)}`,
      );

      if (!response.success) {
        this.logger.warn(
          `❌ Token rejeitado pelo Auth Service: ${response.error}`,
        );
        throw new UnauthorizedException(response.error || 'Token inválido');
      }

      if (response.type !== 'access_token') {
        throw new UnauthorizedException('Tipo de token inválido');
      }

      this.logger.debug(
        `✅ Token válido para usuário: ${response.payload.email}`,
      );

      return response.payload;
    } catch (error) {
      this.logger.error(`💥 Erro na validação do token: ${error.message}`);

      if (error.name === 'TimeoutError') {
        throw new UnauthorizedException('Serviço de autenticação indisponível');
      }

      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
