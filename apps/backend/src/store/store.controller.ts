import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { StoreId } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateStoreDto } from './dto/create-store.dto';
import { StoreService } from './store.service';
import { CreateStoreSwagger } from './swagger/create-store.swagger';
import { GetStoreSwagger } from './swagger/get-store.swagger';

const jwtAuthGuard = JwtAuthGuard([
  'pin-authorization',
  'mobile-authorization',
]);

@Controller('store')
@UseGuards(jwtAuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Patch()
  @CreateStoreSwagger()
  async createStore(@Body() dto: CreateStoreDto, @StoreId() storeId: number) {
    return this.storeService.create(dto, storeId);
  }
  @Get()
  @GetStoreSwagger()
  async getStore(@StoreId() storeId: number) {
    return this.storeService.getStore(storeId);
  }
}
