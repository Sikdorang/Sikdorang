import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { INVALIDATE_CACHE_EVENT } from './invalidate-cache-event.constant';

@WebSocketGateway({ cors: true, namespace: '/ws' })
export class InvalidateCacheGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    const room = socket.handshake.query.room as string;
    if (room) {
      socket.join(room);
      console.log(
        `[Socket] Client connected: ${socket.id}, joined room: ${room}`,
      );
    } else {
      console.warn(`[Socket] Client connected without room: ${socket.id}`);
    }
  }

  handleDisconnect(socket: Socket) {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
  }

  async emitInvalidateCache(roomName: string, data: any) {
    try {
      console.log(data);
      await this.server
        .to(roomName)
        .emit(INVALIDATE_CACHE_EVENT.INVALIDATE_CACHE, data);
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
