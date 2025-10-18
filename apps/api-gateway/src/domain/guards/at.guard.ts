import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class AtAuthGuard extends AuthGuard('at-jwt') {
  private readonly logger = new Logger(AtAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.debug(
      `🔐 Validando acesso à: ${request.method} ${request.url}`,
    );

    return super.canActivate(context);
  }

  handleRequest(err: any, payload: any, info: any, context: ExecutionContext) {
    if (err || !payload) {
      const request = context.switchToHttp().getRequest();
      this.logger.warn(
        `❌ Acesso negado: ${request.method} ${request.url} - ${err?.message || info?.message || 'Usuário não autenticado'}`,
      );

      throw err || new UnauthorizedException('Acesso não autorizado');
    }

    const request = context.switchToHttp().getRequest();
    this.logger.debug(
      `✅ Acesso autorizado: ${payload.email} em ${request.url}`,
    );

    return payload;
  }
}
