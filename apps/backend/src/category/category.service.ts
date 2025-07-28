import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Category, PrismaClient } from '@prisma/client';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private readonly prisma = new PrismaClient();

  async createCategory({
    createCategoryDto,
    storeId,
  }: {
    createCategoryDto: CreateCategoryDto;
    storeId: number;
  }) {
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
      console.log(error);
      throw new InternalServerErrorException('카테고리 생성 중 오류 발생');
    }
  }

  async getCategories({ storeId }: { storeId: number }) {
    try {
      return await this.prisma.category.findMany({
        where: {
          storeId: storeId,
        },
      });
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException('카테고리 조회 중 오류 발생');
    }
  }

  async updateCategory({
    updateCategoryDtos,
    storeId,
  }: {
    updateCategoryDtos: UpdateCategoryDto[];
    storeId: number;
  }) {
    try {
      const updatedCategories = await Promise.all(
        updateCategoryDtos.map((dto) =>
          this.prisma.category.update({
            where: {
              id: dto.categoryId,
              storeId,
            },
            data: {
              category: dto.category,
              order: dto.order,
            },
          }),
        ),
      );
      return updatedCategories;
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException('카테고리 수정 중 오류 발생');
    }
  }

  async deleteCategory({
    storeId,
    categoryId,
  }: {
    storeId: number;
    categoryId: number;
  }) {
    try {
      const category = await this.prisma.category.findFirst({
        where: {
          id: categoryId,
          storeId: storeId,
        },
      });
      if (!category) {
        throw new NotFoundException(
          '해당 카테고리를 찾을 수 없거나 삭제 권한이 없습니다.',
        );
      }

      await this.prisma.category.delete({
        where: { id: categoryId },
      });

      return { message: '카테고리 삭제 성공', id: categoryId };
    } catch (error: any) {
      console.error('[카테고리 삭제 실패]', error);
      throw new InternalServerErrorException(
        '카테고리 삭제 중 오류가 발생했습니다.',
      );
    }
  }
}
