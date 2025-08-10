import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
enum status {
  SALE = 'SALE',
  HIDDEN = 'HIDDEN',
  SOLDOUT = 'SOLDOUT',
}

export class UpdateMenuDetailsDto {
  @ApiProperty({ description: '메뉴 이름', example: '김치찌개' })
  @IsOptional()
  @IsString()
  menu: string;

  @ApiPropertyOptional({ description: '가격', example: 8000 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== null ? Number(value) : undefined))
  price?: number;

  @ApiPropertyOptional({ description: '카테고리 ID', example: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== null ? Number(value) : undefined))
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
  @IsOptional()
  @IsString()
  order?: string;

  @ApiProperty({ description: '신메뉴', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  new?: boolean;

  @ApiProperty({ description: '인기메뉴', example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  popular?: boolean;

  @ApiProperty({ description: '상세설명', example: '맛있는 참소라무침' })
  @IsOptional()
  @IsString()
  description?: string;
}
