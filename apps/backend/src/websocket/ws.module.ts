import { Module } from '@nestjs/common';

import { InvalidateCacheGatewayModule } from './invalidate-cache/invalidate-cache-gateway.module';
import { OrderGatewayModule } from './order/order-gateway.module';

@Module({
  imports: [OrderGatewayModule, InvalidateCacheGatewayModule],
  exports: [OrderGatewayModule, InvalidateCacheGatewayModule],
})
export class WsModule {}
