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

const jwtAuthGuard = JwtAuthGuard(['admin-authorization']);
@Controller('category')
@UseGuards(jwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @CreateCategorySwagger()
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
  async findAll(@StoreId() storeId: number) {
    return await this.categoryService.getCategories({ storeId });
  }

  @Patch()
  @UpdateCategorySwagger()
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
  @deleteCategorySwagger()
  async delete(
    @StoreId() storeId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.categoryService.deleteCategory({ storeId, categoryId });
  }
}
