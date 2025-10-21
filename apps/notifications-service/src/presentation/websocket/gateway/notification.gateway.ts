import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as cookie from 'cookie';
import { firstValueFrom } from 'rxjs';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const cookiesHeader = client.handshake.headers.cookie;
      if (!cookiesHeader)
        throw new UnauthorizedException('Cookies não enviados');

      const cookies = cookie.parse(cookiesHeader);
      const token = cookies['access_token'];
      console.log(token);

      if (!token) throw new UnauthorizedException('Token não informado');

      const user = await firstValueFrom(
        this.authClient.send('auth.validate', { token }),
      );

      if (!user || !user.payload)
        throw new UnauthorizedException('Token inválido');

      client.join(`user-${user.payload.sub}`);
      this.logger.log(`Usuário ${user.payload.sub} conectado ao socket.`);
    } catch (err) {
      this.logger.warn(`Conexão recusada: ${err.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  sendNotification(userId: string, event: string, data: any) {
    this.server.to(`user-${userId}`).emit(event, data);
  }
}
