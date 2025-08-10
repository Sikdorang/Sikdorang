import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
enum status {
  SALE = 'SALE',
  HIDDEN = 'HIDDEN',
  SOLDOUT = 'SOLDOUT',
}

export class CreateMenuDto {
  @ApiProperty({ description: '메뉴 이름', example: '김치찌개' })
  @IsNotEmpty()
  @IsString()
  menu: string;

  @ApiPropertyOptional({ description: '가격', example: 8000 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ description: '카테고리 ID', example: 1 })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({
    enum: status,
    description: '상태값(SALE, HIDDEN, SOLDOUT)',
    example: status.SALE,
  })
  @IsOptional()
  @IsEnum(status)
  status?: status;

  @ApiProperty({ description: '메뉴 순서', example: '1' })
  @IsNotEmpty()
  @IsString()
  order: string;
}
