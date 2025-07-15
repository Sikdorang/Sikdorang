import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { UserId } from '../auth/decorators/user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateStoreDto } from './dto/create-store.dto';
import { StoreService } from './store.service';
import { CreateStoreSwagger } from './swagger/create-store.swagger';
import { GetStoreSwagger } from './swagger/get-store.swagger';

@Controller('store')
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Patch()
  @CreateStoreSwagger()
  async createStore(@Body() dto: CreateStoreDto, @UserId() userId: number) {
    return this.storeService.create(dto, userId);
  }
  @Get()
  @GetStoreSwagger()
  async getStore(@UserId() userId: number) {
    return this.storeService.getStore(userId);
  }
}
