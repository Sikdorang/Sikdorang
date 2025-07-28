import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MenuService {
  private readonly prisma = new PrismaClient();

  async deleteMenu(menuId: number, storeId: number) {
    try {
      const menu = await this.prisma.menu.findUnique({
        where: { id: menuId },
      });

      if (!menu) {
        throw new NotFoundException('해당 메뉴를 찾을 수 없습니다.');
      }

      if (menu.storeId !== storeId) {
        throw new ForbiddenException('삭제 권한이 없습니다.');
      }

      return await this.prisma.menu.delete({
        where: { id: menuId },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
