// src/images/dto/update-image.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateImageDto {
  @ApiPropertyOptional({
    description: '이미지 URL',
    example: 'a.png',
  })
  @IsString()
  image: string;

  @ApiPropertyOptional({ description: '이미지 순서', example: 'sfd98cvx' })
  @IsString()
  order: string;
}
