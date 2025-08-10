import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/ws', cors: true })
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('order/new')
  handleNewOrder(client: Socket, data: any) {
    console.log('🍔 주문 수신:', data);
    this.server.emit('order/new', data);
  }
}
