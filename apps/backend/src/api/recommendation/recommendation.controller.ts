import { Body, Controller, Put, UseGuards } from '@nestjs/common';

import { StoreId } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { PutRecommendationCategoryDto } from './dto/put-recommendation-category.dto';
import { RecommendationService } from './recommendation.service';
import { PutRecommendationCategorySwagger } from './swagger/put-recommendation-category.swagger';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Put()
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
}
