import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: {
    userId: number;
    kakaoId: string;
    storeId?: number;
    tableNumber?: number;
  };
}

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const userId = request.user?.userId;

    if (!userId || typeof userId !== 'number') {
      throw new UnauthorizedException('유효하지 않은 사용자 정보입니다.');
    }

    return userId;
  },
);

export const StoreId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const storeId = request.user?.storeId;
    if (!storeId || typeof storeId !== 'number') {
      throw new UnauthorizedException('유효하지 않은 매장 정보입니다.');
    }

    return storeId;
  },
);

export const TableNumber = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const tableNumber = request.user?.tableNumber;
    if (!tableNumber || typeof tableNumber !== 'number') {
      return -1;
    }
    return tableNumber;
  },
);
