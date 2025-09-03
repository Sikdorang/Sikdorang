import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class PutRecommendationMenuDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  menuId: number[];
}
