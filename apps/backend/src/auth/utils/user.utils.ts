import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: {
    userId: number;
    kakaoId: string;
  };
}

export function extractUserId(req: RequestWithUser): number {
  const userId = req.user?.userId;

  if (!userId || typeof userId !== 'number') {
    throw new UnauthorizedException('유효하지 않은 사용자 정보입니다.');
  }

  return userId;
}
