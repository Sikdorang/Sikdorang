import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { WsModule } from '../../websocket/ws.module';
import { AuthModule } from '../auth/auth.module';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [AuthModule, WsModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
})
export class OrderModule {}
