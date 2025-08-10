import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';

import { CreateOptionDto } from './option.dto';

export class CreateOptionsDto {
  @IsInt()
  menuId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options?: CreateOptionDto[];
}
