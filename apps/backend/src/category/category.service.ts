import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Category, PrismaClient } from '@prisma/client';

import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  private readonly prisma = new PrismaClient();

  async createCategory(createCategoryDto: CreateCategoryDto, storeId: number) {
    try {
      const category: Category = await this.prisma.category.create({
        data: {
          category: createCategoryDto.category,
          order: createCategoryDto.order,
          store: { connect: { id: storeId } },
        },
      });
      return { message: '카테고리 생성 성공', ...category };
    } catch (error) {
      throw new InternalServerErrorException('카테고리 생성 중 오류 발생');
    }
  }

  async getCategories() {
    try {
      return await this.prisma.category.findMany();
    } catch (error: any) {
      throw new InternalServerErrorException('카테고리 조회 중 오류 발생');
    }
  }
}
