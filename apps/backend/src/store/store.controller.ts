import {
  Body,
  Controller,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateStoreDto } from './dto/create-store.dto';
import { StoreService } from './store.service';
import { CreateStoreSwagger } from './swagger/create-store.swagger';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Patch()
  @UseGuards(JwtAuthGuard)
  @CreateStoreSwagger()
  async create(@Body() dto: CreateStoreDto, @Req() req: Request) {
    const userId = Number(req.user?.['userId']);
    if (isNaN(userId)) {
      throw new UnauthorizedException('userId not found');
    }
    return this.storeService.create(dto, userId);
  }
}
