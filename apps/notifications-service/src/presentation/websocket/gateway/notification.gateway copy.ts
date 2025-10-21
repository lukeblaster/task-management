// import {
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway({ namespace: '/notifications', cors: true })
// export class NotificationGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer() server: Server;

//   private userSockets = new Map<string, Set<string>>();

//   handleConnection(client: Socket, ...args: any[]) {
//     const userId = client.handshake.auth['userId'];
//     try {
//       client.data.userId = userId;

//       if (!this.userSockets.has(userId))
//         this.userSockets.set(userId, new Set());

//       this.userSockets.get(userId)?.add(client.id);

//       console.log(`✅ User ${userId} connected`);
//     } catch (error) {
//       client.disconnect();
//     }
//   }

//   handleDisconnect(client: Socket) {
//     const userId = client.data.userId;

//     if (!userId) return;

//     const sockets = this.userSockets.get(userId);
//     sockets?.delete(client.id);
//     if (sockets?.size === 0) this.userSockets.delete(userId);
//     console.log(`❌ User ${userId} disconnected`);
//   }

//   emitToUser(userId: string, event: string, payload: any) {
//     const sockets = this.userSockets.get(userId);
//     if (!sockets) return;
//     for (const socketId of sockets) {
//       this.server.to(socketId).emit(event, payload);
//     }
//   }
// }
