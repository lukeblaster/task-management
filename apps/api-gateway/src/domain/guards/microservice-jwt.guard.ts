import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class MicroserviceJwtAuthGuard extends AuthGuard('microservice-jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, username: any, info: any) {
    if (err || !username) {
      throw err || new Error('Não autenticado');
    }
    return username;
  }
}
