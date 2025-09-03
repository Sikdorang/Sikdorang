import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class OptionDetailDto {
  @IsInt()
  @IsOptional()
  menuOptionId?: number;

  @IsOptional()
  @IsInt()
  optionDetailId?: number;

  @IsString()
  optionDetail?: string;

  @IsInt()
  @Min(0)
  price?: number;

  @IsString()
  @IsOptional()
  order?: string;
}
