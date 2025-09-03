import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { AuthModule } from '../auth/auth.module';

import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';

@Module({
  imports: [AuthModule],
  controllers: [RecommendationController],
  providers: [
    RecommendationService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
})
export class RecommendationModule {}
