import { Module } from '@nestjs/common';

import { OrderReceiverGateway } from './order-receiver.gateway';
import { OrderSenderGateway } from './order-sender.gateway';

@Module({
  providers: [OrderSenderGateway, OrderReceiverGateway],
  exports: [OrderSenderGateway],
})
export class OrderGatewayModule {}
