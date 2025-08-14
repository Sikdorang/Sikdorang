import { Module } from '@nestjs/common';

import { OrderGatewayModule } from './order/order-gateway.module';

@Module({
  imports: [OrderGatewayModule],
  exports: [OrderGatewayModule],
})
export class WsModule {}
