import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { WsModule } from './ws.module';

async function bootstrap() {
  const app = await NestFactory.create(WsModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(4001);
  console.log('WebSocket 서버 실행: http://localhost:4001');
}
bootstrap();
