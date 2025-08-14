import { randomUUID } from 'crypto';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { ORDER_EVENT } from './order-event.constant';

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 1000; // 1초

@WebSocketGateway({
  cors: true,
  namespace: '/',
})
export class OrderSenderGateway {
  @WebSocketServer()
  server: Server;

  private pendingAcks: Map<string, (value: void) => void> = new Map();

  async emitOrderCreated(roomName: string, data: any): Promise<void> {
    const key = randomUUID();

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        await new Promise<void>((resolve, reject) => {
          this.pendingAcks.set(key, resolve);
          this.server
            .to(roomName)
            .emit(ORDER_EVENT.ORDER_CREATED, { ...data, key });

          setTimeout(() => {
            if (this.pendingAcks.has(key)) {
              this.pendingAcks.delete(key);
              reject(new Error('ACK timeout'));
            }
          }, RETRY_INTERVAL);
        });

        console.log(`[Socket] Order event delivered to room: ${roomName}`);
        return;
      } catch (error) {
        console.warn(`[Socket] Emit attempt ${attempt} failed: ${error}`);
        if (attempt === MAX_RETRIES) {
          console.error(
            `[Socket] Order emit failed after ${MAX_RETRIES} retries.`,
          );
        } else {
          await new Promise((res) => setTimeout(res, RETRY_INTERVAL));
        }
      }
    }
  }

  resolveAck(key: string) {
    const resolve = this.pendingAcks.get(key);
    if (resolve) {
      resolve();
      this.pendingAcks.delete(key);
      console.log(`[Socket] Ack resolved for key: ${key}`);
    }
  }
}
