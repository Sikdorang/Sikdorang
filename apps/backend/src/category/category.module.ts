import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { AuthModule } from '../auth/auth.module';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [AuthModule],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
})
export class CategoryModule {}
