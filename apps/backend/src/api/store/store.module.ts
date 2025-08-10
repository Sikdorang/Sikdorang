import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { AuthModule } from '../auth/auth.module';

import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [AuthModule],
  controllers: [StoreController],
  providers: [
    StoreService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
})
export class StoreModule {}
