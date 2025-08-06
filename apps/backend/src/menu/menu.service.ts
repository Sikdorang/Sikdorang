import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Menu, PrismaClient } from '@prisma/client';

import { CreateMenuDto } from './dto/create-menu.dto';
import { CreateOptionsDto } from './dto/create-option.dto';
import { UpdateMenuDetailsDto } from './dto/update-menu-details.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

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
    createMenusDtos: CreateMenuDto[];
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
    updateMenusDtos: UpdateMenuDto[];
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

  async updateMenuDetails({
    updateMenuDetailsDto,
    storeId,
    menuId,
  }: {
    updateMenuDetailsDto: UpdateMenuDetailsDto;
    storeId: number;
    menuId: number;
  }) {
    try {
      const updated = await this.prisma.menu.update({
        where: {
          id: menuId,
          storeId,
        },
        data: updateMenuDetailsDto,
      });

      return updated;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('메뉴 상세정보 수정 중 오류 발생');
    }
  }

  async createOption({
    createOptionDto,
  }: {
    createOptionDto: CreateOptionsDto;
  }) {
    try {
      const { options } = createOptionDto;
      if (!options || options.length === 0) {
        return { message: '옵션이 없습니다.' };
      }
      for (const option of options) {
        let optionId: number;

        if (option.optionId) {
          await this.prisma.menuOption.update({
            where: { id: option.optionId },
            data: {
              option: option.option ?? '',
              minOption: option.minOption ?? 0,
              maxOption: option.maxOption ?? 1,
              optionRequired: option.optionRequired ?? false,
            },
          });
          optionId = option.optionId;
        } else {
          const created = await this.prisma.menuOption.create({
            data: {
              menuId: option.menuId,
              option: option.option ?? '',
              minOption: option.minOption ?? 0,
              maxOption: option.maxOption ?? 1,
              optionRequired: option.optionRequired ?? false,
            },
          });
          optionId = created.id;
        }
        if (option.optionDetails && option.optionDetails.length > 0) {
          for (const detail of option.optionDetails) {
            if (detail.optionDetailId) {
              await this.prisma.optionDetail.update({
                where: { id: detail.optionDetailId },
                data: {
                  optionDetail: detail.optionDetail ?? '',
                  price: detail.price ?? 0,
                },
              });
            } else {
              await this.prisma.optionDetail.create({
                data: {
                  menuOptionId: optionId,
                  optionDetail: detail.optionDetail ?? '',
                  price: detail.price ?? 0,
                },
              });
            }
          }
        }
      }
      return { message: '옵션과 상세가 성공적으로 저장되었습니다.' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('옵션 생성 중 오류 발생');
    }
  }
}
