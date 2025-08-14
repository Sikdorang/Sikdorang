import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { StoreId } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateStoreDto } from './dto/create-store.dto';
import { StoreService } from './store.service';
import { CreateStoreSwagger } from './swagger/create-store.swagger';
import { GetStoreSwagger } from './swagger/get-store.swagger';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Patch()
  @CreateStoreSwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async createStore(@Body() dto: CreateStoreDto, @StoreId() storeId: number) {
    return this.storeService.create(dto, storeId);
  }
  @Get()
  @GetStoreSwagger()
  @UseGuards(
    JwtAuthGuard([
      'pin-authorization',
      'mobile-authorization',
      'admin-authorization',
    ]),
  )
  async getStore(@StoreId() storeId: number) {
    return this.storeService.getStore(storeId);
  }
}
