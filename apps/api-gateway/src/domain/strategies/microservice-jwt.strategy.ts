import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MicroserviceJwtStrategy extends PassportStrategy(
  Strategy,
  'microservice-jwt',
) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {
    super();
  }

  async validate(request: any): Promise<any> {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.substring(7);

    try {
      const response = await firstValueFrom(
        this.authClient.send('auth.validate', { token }),
      );

      if (!response.success) {
        throw new UnauthorizedException('Token inválido');
      }

      return response.data;
    } catch (error) {
      throw new UnauthorizedException('Falha na validação do token');
    }
  }
}
