import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MenuService {
  private readonly prisma = new PrismaClient();

  async deleteMenu({ menuId, storeId }: { menuId: number; storeId: number }) {
    try {
      const menu = await this.prisma.menu.findUnique({
        where: { id: menuId },
      });

      if (!menu) {
        throw new NotFoundException('해당 메뉴를 찾을 수 없습니다.');
      }

      return await this.prisma.menu.delete({
        where: { id: menuId, storeId: storeId },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getMenusByCategory({
    categoryId,
    storeId,
  }: {
    categoryId: number;
    storeId: number;
  }) {
    try {
      return await this.prisma.menu.findMany({
        where: { categoryId: categoryId, storeId: storeId },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
