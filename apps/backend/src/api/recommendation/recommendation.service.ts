import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PostRecommendationModeDto } from './dto/post-recommendation-mode.dto';
import { PutRecommendationCategoryDto } from './dto/put-recommendation-category.dto';

@Injectable()
export class RecommendationService {
  private readonly prisma = new PrismaClient();

  async putRecommendationCategory({
    putRecommendationCategoryDto,
    storeId,
  }: {
    putRecommendationCategoryDto: PutRecommendationCategoryDto[];
    storeId: number;
  }) {
    const existingCategories =
      await this.prisma.recommendationCategory.findMany({
        where: { storeId },
        select: { categoryId: true },
      });

    const existingCategoryIds = existingCategories.map((c) => c.categoryId);

    //새로 들어온 categoryId 목록
    const newCategoryIds = putRecommendationCategoryDto
      .map((dto) => dto.categoryId)
      .filter((id): id is number => typeof id === 'number');

    //추가해야 할 categoryId들 = 새로 들어온 목록 중 기존에 없는 것
    const toAdd = newCategoryIds.filter(
      (id) => !existingCategoryIds.includes(id),
    );

    //삭제해야 할 categoryId들 = 기존 목록 중 새로 안 들어온 것
    const toDelete = existingCategoryIds.filter(
      (id) => !newCategoryIds.includes(id),
    );

    //삭제 실행
    if (toDelete.length > 0) {
      await this.prisma.recommendationCategory.deleteMany({
        where: {
          storeId,
          categoryId: {
            in: toDelete,
          },
        },
      });
    }

    //추가 실행
    if (toAdd.length > 0) {
      await this.prisma.recommendationCategory.createMany({
        data: toAdd.map((categoryId) => ({
          storeId,
          categoryId,
        })),
      });
    }

    return {
      added: toAdd,
      removed: toDelete,
    };
  }

  async setRecommendationMode({
    storeId,
    postRecommendationModeDto,
  }: {
    storeId: number;
    postRecommendationModeDto: PostRecommendationModeDto;
  }) {
    return await this.prisma.store.update({
      where: { id: storeId },
      data: {
        recommendationMode: {
          set: postRecommendationModeDto.recommendationMode,
        },
      },
    });
  }
}
