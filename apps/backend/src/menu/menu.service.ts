import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Menu, PrismaClient } from '@prisma/client';

import { CreateMenusDto } from './dto/create-menus.dto';
import { UpdateMenusDto } from './dto/update-menus.dto';

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
      throw new InternalServerErrorException('메뉴 삭제 중 오류 발생');
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
      throw new InternalServerErrorException('메뉴 받아오기 중 오류 발생');
    }
  }

  async createMenus({
    createMenusDtos,
    storeId,
  }: {
    createMenusDtos: CreateMenusDto[];
    storeId: number;
  }) {
    try {
      return await this.prisma.menu.createMany({
        data: createMenusDtos.map((dto) => ({
          storeId,
          ...dto,
        })),
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('메뉴 생성 중 오류 발생');
    }
  }

  async updateMenus({
    updateMenusDtos,
    storeId,
  }: {
    updateMenusDtos: UpdateMenusDto[];
    storeId: number;
  }) {
    try {
      const results: Menu[] = [];

      for (const dto of updateMenusDtos) {
        const { menuId, ...data } = dto;

        const updated = await this.prisma.menu.update({
          where: {
            id: menuId,
            storeId,
          },
          data,
        });

        results.push(updated);
      }

      return results;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('메뉴 업데이트 중 오류 발생');
    }
  }
}
