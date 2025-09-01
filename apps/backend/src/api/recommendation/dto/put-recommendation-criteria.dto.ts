import { IsNumber, IsOptional } from 'class-validator';

export class PutRecommendationCriteriaDto {
  @IsOptional()
  @IsNumber()
  goodId?: number;

  @IsOptional()
  @IsNumber()
  normalId?: number;

  @IsOptional()
  @IsNumber()
  badId?: number;
}
