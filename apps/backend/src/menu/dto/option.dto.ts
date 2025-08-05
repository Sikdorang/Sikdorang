import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { OptionDetailDto } from './option-detail.dto';

export class CreateOptionDto {
  @IsInt()
  menuId: number;

  @IsOptional()
  @IsInt()
  optionId?: number;

  @IsString()
  option?: string;

  @IsInt()
  @Min(0)
  maxOption?: number;

  @IsInt()
  @Min(0)
  minOption?: number;

  @IsBoolean()
  optionRequired?: boolean;

  @ValidateNested({ each: true })
  @Type(() => OptionDetailDto)
  optionDetails?: OptionDetailDto[];
}
