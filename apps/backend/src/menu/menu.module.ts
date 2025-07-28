import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { AuthModule } from '../auth/auth.module';

import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [AuthModule],
  controllers: [MenuController],
  providers: [
    MenuService,
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
})
export class MenuModule {}
