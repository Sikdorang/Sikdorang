import { Injectable } from '@nestjs/common';
import { PrismaClient, TasteType } from '@prisma/client';

import { PostRecommendationModeDto } from './dto/post-recommendation-mode.dto';
import { PutRecommendationCategoryDto } from './dto/put-recommendation-category.dto';
import { PutRecommendationCriteriaDto } from './dto/put-recommendation-criteria.dto';
import { PutRecommendationMenuDto } from './dto/put-recommendation-menu.dto';

@Injectable()
export class RecommendationService {
  private readonly prisma = new PrismaClient();

  async getRecommendationCategory({ storeId }: { storeId: number }) {
    const recommendationCategories =
      await this.prisma.recommendationCategory.findMany({
        where: { storeId },
        include: {
          category: {
            include: {
              menus: {
                where: {
                  status: 'SALE',
                },
                include: {
                  images: {
                    where: { deleted: false },
                    orderBy: { order: 'asc' },
                  },
                },
                orderBy: { order: 'asc' },
              },
            },
          },
        },
      });

    // 카테고리별로 묶어서 반환
    return recommendationCategories.map((recCategory) => ({
      categoryId: recCategory.category.id,
      category: recCategory.category.category,
      items: recCategory.category.menus.map((menu) => ({
        id: menu.id,
        name: menu.menu,
        price: menu.price,
        isNew: menu.new,
        isPopular: menu.popular,
        imgUrl: menu.images.length > 0 ? menu.images[0].image : undefined,
        status: menu.status,
        order: menu.order,
      })),
    }));
  }

  async putRecommendationCategory({
    putRecommendationCategoryDto,
    storeId,
  }: {
    putRecommendationCategoryDto: PutRecommendationCategoryDto;
    storeId: number;
  }) {
    const existingCategories =
      await this.prisma.recommendationCategory.findMany({
        where: { storeId },
        select: { categoryId: true },
      });

    const existingCategoryIds = existingCategories.map((c) => c.categoryId);

    //새로 들어온 categoryId 목록
    const newCategoryIds = (
      putRecommendationCategoryDto.categoryId || []
    ).filter((id): id is number => typeof id === 'number');

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

  async putRecommendationCriteria({
    recommendationTypeId,
    putRecommendationCriteriaDto,
  }: {
    storeId: number;
    recommendationTypeId: number;
    putRecommendationCriteriaDto: PutRecommendationCriteriaDto;
  }) {
    const updateData: any = {};

    if (putRecommendationCriteriaDto.goodId !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updateData.goodId =
        putRecommendationCriteriaDto.goodId === 0
          ? null
          : putRecommendationCriteriaDto.goodId;
    }

    if (putRecommendationCriteriaDto.normalId !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updateData.normalId =
        putRecommendationCriteriaDto.normalId === 0
          ? null
          : putRecommendationCriteriaDto.normalId;
    }

    if (putRecommendationCriteriaDto.badId !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updateData.badId =
        putRecommendationCriteriaDto.badId === 0
          ? null
          : putRecommendationCriteriaDto.badId;
    }

    return await this.prisma.recommendationMenuCriteria.update({
      where: { id: recommendationTypeId },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: updateData,
    });
  }

  async getRecommendationCriteriaMenu({
    storeId,
    taste,
  }: {
    storeId: number;
    taste?: TasteType;
  }) {
    return await this.prisma.recommendationMenuCriteria.findMany({
      where: {
        storeId,
        ...(taste ? { taste } : {}),
      },
      include: {
        good: true,
        normal: true,
        bad: true,
      },
    });
  }

  async getRecommendationMenu({
    storeId,
    recommendationTypeId,
  }: {
    storeId: number;
    recommendationTypeId: number;
  }) {
    return await this.prisma.recommendationMenu.findMany({
      where: { storeId, recommendationTypeId },
      include: {
        menu: true,
      },
    });
  }

  async putRecommendationMenu({
    storeId,
    recommendationTypeId,
    putRecommendationMenuDto,
  }: {
    storeId: number;
    recommendationTypeId: number;
    putRecommendationMenuDto: PutRecommendationMenuDto;
  }) {
    const { menuId } = putRecommendationMenuDto;

    await this.prisma.recommendationMenu.deleteMany({
      where: { storeId, recommendationTypeId },
    });

    if (Array.isArray(menuId) && menuId.length > 0) {
      await this.prisma.recommendationMenu.createMany({
        data: menuId.map((id) => ({
          storeId,
          recommendationTypeId,
          menuId: id,
        })),
      });
    }

    return { message: '추천 메뉴가 저장되었습니다.' };
  }

  async getRecommendationTypeData({ storeId }: { storeId: number }) {
    return this.prisma.store.findUnique({
      where: { id: storeId },
      select: {
        recommendationMode: true,
      },
    });
  }

  async getRecommendationTypeDataById({
    recommendationTypeId,
  }: {
    recommendationTypeId: number;
  }) {
    return await this.prisma.recommendationTypeData.findUnique({
      where: { id: recommendationTypeId },
    });
  }
}
