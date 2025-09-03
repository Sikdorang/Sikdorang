import { RecommendationMode } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class PostRecommendationModeDto {
  @IsEnum(RecommendationMode, {
    message: 'recommendationMode 값은 SIMPLE 또는 PRECISE 중 하나여야 합니다.',
  })
  recommendationMode: RecommendationMode;
}
