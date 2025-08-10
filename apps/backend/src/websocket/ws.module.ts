import { Module } from '@nestjs/common';

import { OrderGateway } from './order.gateway';

@Module({
  providers: [OrderGateway],
})
export class WsModule {}
