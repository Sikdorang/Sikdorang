import {
  BadRequestException,
  Body,
  Controller,
  Get,
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
import { RecommendationService } from './recommendation.service';
import { PostRecommendationModeSwagger } from './swagger/post-recommendation-mode.swagger';
import { PutRecommendationCategorySwagger } from './swagger/put-recommendation-category.swagger';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Put('/category')
  @PutRecommendationCategorySwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async putRecommendationCategory(
    @Body() putRecommendationCategoryDto: PutRecommendationCategoryDto[],
    @StoreId() storeId: number,
  ) {
    return await this.recommendationService.putRecommendationCategory({
      putRecommendationCategoryDto,
      storeId,
    });
  }

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

  @Get('/recommendation-criteria')
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

  //각 맛에 대한 대표 술 get 요청
  //각 유형에 해당하는 술 get 요청
  //지정하기 다 받아서 update하기
  //설명보기 get 요청
  //대표 술 지정하기
  //지정된 술 보내주기`
}
