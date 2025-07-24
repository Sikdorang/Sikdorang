import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { StoreId } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategorySwagger } from './swagger/create-category.swagger';
import { GetCategorySwagger } from './swagger/get-category.swagger';

const jwtAuthGuard = JwtAuthGuard([
  'pin-authorization',
  'mobile-authorization',
]);
@Controller('category')
@UseGuards(jwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @CreateCategorySwagger()
  async create(@Body() dto: CreateCategoryDto, @StoreId() storeId: number) {
    return await this.categoryService.createCategory(dto, storeId);
  }

  @Get()
  @GetCategorySwagger()
  async findAll() {
    return this.categoryService.getCategories();
  }
}
