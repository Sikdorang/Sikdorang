import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, ValidateNested } from 'class-validator';

export class SelectedOptionDto {
  @IsInt()
  menuOptionId: number;

  @IsArray()
  @Type(() => Number)
  optionDetailIds: number[];
}

export class OrderItemDto {
  @IsInt()
  menuId: number;

  @IsInt()
  quantity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SelectedOptionDto)
  selectedOptions: SelectedOptionDto[];
}

export class CreateOrderDto {
  @IsOptional()
  @IsInt()
  tableNumber?: number; // 태블릿일 때만

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
