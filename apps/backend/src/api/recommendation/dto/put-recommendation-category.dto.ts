import { IsInt, IsOptional } from 'class-validator';

export class PutRecommendationCategoryDto {
  @IsInt()
  @IsOptional()
  categoryId?: number;
}
