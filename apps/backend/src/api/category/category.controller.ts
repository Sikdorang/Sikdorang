import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { StoreId } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategorySwagger } from './swagger/create-category.swagger';
import { deleteCategorySwagger } from './swagger/delete-category.swagger';
import { GetCategorySwagger } from './swagger/get-category.swagger';
import { UpdateCategorySwagger } from './swagger/update-category.swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @CreateCategorySwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @StoreId() storeId: number,
  ) {
    return await this.categoryService.createCategory({
      createCategoryDto,
      storeId,
    });
  }

  @Get()
  @GetCategorySwagger()
  @UseGuards(
    JwtAuthGuard([
      'admmin-authorization',
      'pin-authorization',
      'mobile-authorization',
    ]),
  )
  async findAll(@StoreId() storeId: number) {
    return await this.categoryService.getCategories({ storeId });
  }

  @Patch()
  @UpdateCategorySwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async update(
    @Body() updateCategoryDtos: UpdateCategoryDto[],
    @StoreId() storeId: number,
  ) {
    return await this.categoryService.updateCategory({
      updateCategoryDtos,
      storeId,
    });
  }

  @Delete(':categoryId')
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  @deleteCategorySwagger()
  async delete(
    @StoreId() storeId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.categoryService.deleteCategory({ storeId, categoryId });
  }
}
