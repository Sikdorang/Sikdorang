import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  order: string;
}
