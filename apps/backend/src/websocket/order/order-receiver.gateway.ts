import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { ORDER_EVENT } from './order-event.constant';
import { OrderSenderGateway } from './order-sender.gateway';

@WebSocketGateway({
  cors: true,
  namespace: '/ws',
})
export class OrderReceiverGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly orderSenderGateway: OrderSenderGateway) {}

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

  @SubscribeMessage(ORDER_EVENT.ORDER_CREATED_ACK)
  handleOrderCreatedAck(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: { key: string },
  ) {
    const { key } = body;
    console.log(
      `[Socket] Received ACK from client ${socket.id} for key: ${key}`,
    );
    this.orderSenderGateway.resolveAck(key);
  }
}
