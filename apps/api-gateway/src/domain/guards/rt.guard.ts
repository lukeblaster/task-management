import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class RtAuthGuard extends AuthGuard('rt-jwt') {
  private readonly logger = new Logger(RtAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.debug(
      `🔄 Validando refresh token para: ${request.method} ${request.url}`,
    );

    return super.canActivate(context);
  }

  handleRequest(err: any, payload: any, info: any, context: ExecutionContext) {
    if (err || !payload) {
      const request = context.switchToHttp().getRequest();
      this.logger.warn(
        `❌ Refresh token inválido: ${request.url} - ${err?.message || info?.message}`,
      );

      throw err || new UnauthorizedException('Refresh token inválido');
    }

    this.logger.debug(
      `✅ Refresh token válido para usuário ID: ${payload.email}`,
    );
    return payload;
  }
}
