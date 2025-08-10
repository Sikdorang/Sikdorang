import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateOptionsDto } from '../dto/create-option.dto';

export function CreateOptionSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '메뉴 옵션 및 상세 등록' }),
    ApiBody({
      description: '옵션 및 상세 항목을 함께 등록',
      type: CreateOptionsDto,
      examples: {
        example1: {
          summary: '옵션과 상세 항목 예시',
          value: {
            menuId: 5,
            options: [
              {
                menuId: 5,
                option: '맵기',
                minOption: 1,
                maxOption: 1,
                optionRequired: true,
                optionDetails: [
                  {
                    menuOptionId: '있으면 update 없으면 create',
                    optionDetailId: '있으면 update 없으면 create',
                    optionDetail: '안 매움',
                    price: 0,
                  },
                  {
                    menuOptionId: '있으면 update 없으면 create',
                    optionDetailId: '있으면 update 없으면 create',
                    optionDetail: '매움',
                    price: 500,
                  },
                ],
              },
              {
                option: '사이즈',
                minOption: 1,
                maxOption: 1,
                optionRequired: false,
                optionDetails: [
                  {
                    menuOptionId: '있으면 update 없으면 create',
                    optionDetailId: '있으면 update 없으면 create',
                    optionDetail: '보통',
                    price: 0,
                  },
                  {
                    menuOptionId: '있으면 update 없으면 create',
                    optionDetailId: '있으면 update 없으면 create',
                    optionDetail: '곱빼기',
                    price: 2000,
                  },
                ],
              },
            ],
          },
        },
      },
    }),
    ApiResponse({ status: 201, description: '옵션 및 상세 생성 성공' }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청 (DTO validation 실패 등)',
    }),
    ApiResponse({ status: 401, description: '인증 실패' }),
    ApiResponse({ status: 500, description: '서버 내부 오류' }),
  );
}
