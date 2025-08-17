import { Module } from '@nestjs/common';

import { InvalidateCacheGateway } from './invalidate-cache.gateway';

@Module({
  providers: [InvalidateCacheGateway],
  exports: [InvalidateCacheGateway],
})
export class InvalidateCacheGatewayModule {}
