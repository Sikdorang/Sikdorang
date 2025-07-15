import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createStoreDto: CreateStoreDto, userId: number) {
    try {
      const data = { ...createStoreDto, userId };
      return this.prisma.store.update({
        where: { id: data.userId },
        data,
      });
    } catch (error) {
      console.error('Store create 에러:', error);
      throw new InternalServerErrorException(
        '매장 생성/수정 중 오류가 발생했습니다.',
      );
    }
  }
  async getStore(userId: number) {
    try {
      return await this.prisma.store.findMany({
        where: { userId },
      });
    } catch (error) {
      console.error('Store get 에러:', error);
      throw new InternalServerErrorException(
        '매장 정보 조회 중 오류가 발생하였습니다',
      );
    }
  }
}
