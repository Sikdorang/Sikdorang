import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasteType } from '@prisma/client';

import { StoreId } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { PostRecommendationModeDto } from './dto/post-recommendation-mode.dto';
import { PutRecommendationCategoryDto } from './dto/put-recommendation-category.dto';
import { PutRecommendationCriteriaDto } from './dto/put-recommendation-criteria.dto';
import { PutRecommendationMenuDto } from './dto/put-recommendation-menu.dto';
import { RecommendationService } from './recommendation.service';
import { GetRecommendationCategorySwagger } from './swagger/get-recommendation-category.swagger';
import { GetRecommendationCriteriaSwagger } from './swagger/get-recommendation-criteria.swagger';
import { GetRecommendationMenuSwagger } from './swagger/get-recommendation-menu.swagger';
import { PostRecommendationModeSwagger } from './swagger/post-recommendation-mode.swagger';
import { PutRecommendationCategorySwagger } from './swagger/put-recommendation-category.swagger';
import { PutRecommendationCriteriaSwagger } from './swagger/put-recommendation-criteria.swagger';
import { PutRecommendationMenuSwagger } from './swagger/put-recommendation-menu.swagger';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  // 추천 받을 메뉴의 카테고리 설정하기
  @Put('/category')
  @PutRecommendationCategorySwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async putRecommendationCategory(
    @Body() putRecommendationCategoryDto: PutRecommendationCategoryDto,
    @StoreId() storeId: number,
  ) {
    return await this.recommendationService.putRecommendationCategory({
      putRecommendationCategoryDto,
      storeId,
    });
  }

  @Get('/category')
  @GetRecommendationCategorySwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async getRecommendationCategory(@StoreId() storeId: number) {
    return await this.recommendationService.getRecommendationCategory({
      storeId,
    });
  }

  // 추천 모드 설정하기
  @Post('/recommendationMode')
  @PostRecommendationModeSwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async postRecommendationMode(
    @Body() postRecommendationModeDto: PostRecommendationModeDto,
    @StoreId() storeId: number,
  ) {
    return await this.recommendationService.setRecommendationMode({
      postRecommendationModeDto,
      storeId,
    });
  }

  // 각각의 맛에 대한 좋음, 중간, 나쁨 메뉴 설정하기
  @Put('/recommendation-criteria/:recommendationTypeId')
  @PutRecommendationCriteriaSwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async putRecommendationCriteria(
    @Body() putRecommendationCriteriaDto: PutRecommendationCriteriaDto,
    @Param('recommendationTypeId') recommendationTypeId: number,
    @StoreId() storeId: number,
  ) {
    return await this.recommendationService.putRecommendationCriteria({
      putRecommendationCriteriaDto,
      recommendationTypeId,
      storeId,
    });
  }

  // 각각의 맛에 대한 좋음, 중간, 나쁨 메뉴 데이터 받아오기
  @Get('/recommendation-criteria')
  @GetRecommendationCriteriaSwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async getRecommendationCriteriaMenu(
    @StoreId() storeId: number,
    @Query('taste') taste?: TasteType,
  ) {
    const normalizedTaste = taste?.toUpperCase();

    if (
      taste &&
      !Object.values(TasteType).includes(normalizedTaste as TasteType)
    ) {
      throw new BadRequestException(
        `Invalid taste value: ${taste}. Must be one of: ${Object.values(TasteType).join(', ')}`,
      );
    }

    return this.recommendationService.getRecommendationCriteriaMenu({
      storeId,
      taste: normalizedTaste as TasteType,
    });
  }

  //추천 타입에 해당하는 설정된 추천 메뉴 받아오기
  @Get('/recommendation-menu/:recommendationTypeId')
  @GetRecommendationMenuSwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async getRecommendationMenu(
    @StoreId() storeId: number,
    @Param('recommendationTypeId') recommendationTypeId: number,
  ) {
    return await this.recommendationService.getRecommendationMenu({
      storeId,
      recommendationTypeId,
    });
  }

  //추천 타입에 해당하는 추천 메뉴 등록하기 & 업데이트
  @Put('/recommendation-menu/:recommendationTypeId')
  @PutRecommendationMenuSwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async putRecommendationMenu(
    @StoreId() storeId: number,
    @Param('recommendationTypeId') recommendationTypeId: number,
    @Body() putRecommendationMenuDto: PutRecommendationMenuDto,
  ) {
    return await this.recommendationService.putRecommendationMenu({
      storeId,
      recommendationTypeId,
      putRecommendationMenuDto,
    });
  }
  //설명보기 get 요청
}
