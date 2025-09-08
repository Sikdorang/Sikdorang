import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { StoreHourDto } from './store-hour.dto';
export class CreateStoreDto {
  @ApiProperty({ description: '가게 이름', example: '매장-12345' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  store?: string;

  @ApiPropertyOptional({
    description: '가게 설명',
    example: '분위기 좋은 이탈리안 레스토랑',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: '와이파이 아이디', example: 'my-wifi' })
  @IsOptional()
  @IsString()
  wifiId?: string;

  @ApiPropertyOptional({
    description: '와이파이 비밀번호',
    example: '12345678',
  })
  @IsOptional()
  @IsString()
  wifiPassword?: string;

  @ApiPropertyOptional({ description: '전화번호', example: '010-1234-5678' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: '네이버 플레이스 주소',
    example: 'https://naver.me/xxxx',
  })
  @IsOptional()
  @IsString()
  naverPlace?: string;

  @ApiPropertyOptional({
    description: '콜키지 가능 여부',
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  corkagePossible?: boolean;

  @ApiPropertyOptional({
    description: '콜키지 가격',
    type: Number,
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  corkagePrice?: number;

  @ApiPropertyOptional({ description: '화장실 정보', example: '남/여 구분' })
  @IsOptional()
  @IsString()
  toilet?: string;

  @ApiPropertyOptional({
    description: '운영 시간 정보',
    type: [StoreHourDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoreHourDto)
  time?: StoreHourDto[];

  @ApiPropertyOptional({
    description: '영업시간 여부',
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isBusinessTimeSame?: boolean;
}
