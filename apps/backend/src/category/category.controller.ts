import { Body, Controller, Get, Post } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategorySwagger } from './swagger/create-category.swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @CreateCategorySwagger()
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get()
  async findAll() {
    return this.categoryService.getCategories();
  }
}
