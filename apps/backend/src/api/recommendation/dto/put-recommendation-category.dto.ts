import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class PutRecommendationCategoryDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  categoryId?: number[];
}
