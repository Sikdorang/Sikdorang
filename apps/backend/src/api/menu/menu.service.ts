import { extname } from 'path';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Menu, PrismaClient } from '@prisma/client';

import { InvalidateCacheGateway } from '../../websocket/invalidate-cache/invalidate-cache.gateway';

import { CreateMenuDto } from './dto/create-menu.dto';
import { CreateOptionsDto } from './dto/create-option.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { UpdateMenuDetailsDto } from './dto/update-menu-details.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  private s3: S3Client;
  private readonly prisma = new PrismaClient();
  constructor(private readonly invalidateCacheGateway: InvalidateCacheGateway) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
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
      await this.invalidateCacheGateway.emitInvalidateCache(
        `store-${storeId}-menu`,
        'invalidate-cache',
      );
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

      await this.invalidateCacheGateway.emitInvalidateCache(
        `store-${storeId}-menu`,
        'invalidate-cache',
      );

      return updated;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('메뉴 상세정보 수정 중 오류 발생');
    }
  }

  async createOption({
    storeId,
    createOptionDto,
  }: {
    storeId: number;
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

      await this.invalidateCacheGateway.emitInvalidateCache(
        `store-${storeId}-menu`,
        'invalidate-cache',
      );
      return { message: '옵션과 상세가 성공적으로 저장되었습니다.' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('옵션 생성 중 오류 발생');
    }
  }

  async updateImage({
    updateImageDtos,
    menuId,
    storeId,
  }: {
    updateImageDtos: UpdateImageDto[];
    menuId: number;
    storeId: number;
  }) {
    const existingImages = await this.prisma.image.findMany({
      where: {
        menuId: menuId,
        deleted: false,
      },
    });

    const presignedUrls: {
      key: string;
      uploadUrl: string;
      publicUrl: string;
      originalName?: string;
    }[] = [];

    for (const dto of updateImageDtos) {
      const matched = existingImages.find((img) => img.image === dto.image);

      if (matched) {
        if (dto.order !== undefined && dto.order !== matched.order) {
          await this.prisma.image.update({
            where: { id: matched.id },
            data: { order: dto.order },
          });
        }
      } else {
        const ext = extname(dto.image).toLowerCase().replace('.', '');
        const key = `stores/${storeId}/menus/${menuId}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;

        const cmd = new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET!,
          Key: key,
        });

        const uploadUrl = await getSignedUrl(this.s3, cmd, { expiresIn: 300 });

        await this.prisma.image.create({
          data: {
            menuId,
            image: key,
            order: dto.order,
          },
        });

        presignedUrls.push({
          key,
          uploadUrl,
          publicUrl: `${process.env.CF_DOMAIN}/${encodeURIComponent(key)}`,
          originalName: dto.image,
        });
      }
    }
    const dtoImages = updateImageDtos.map((dto) => dto.image).filter(Boolean);
    const toDelete = existingImages.filter(
      (img) => !dtoImages.includes(img.image),
    );

    for (const img of toDelete) {
      await this.prisma.image.update({
        where: { id: img.id },
        data: { deleted: true },
      });
    }

    await this.invalidateCacheGateway.emitInvalidateCache(
      `store-${storeId}-menu`,
      'invalidate-cache',
    );

    return presignedUrls;
  }

  async getAllMenus({ storeId }: { storeId: number }) {
    const categories = await this.prisma.category.findMany({
      where: { storeId },
      orderBy: { order: 'asc' },
      include: {
        menus: {
          orderBy: { order: 'asc' },
          include: {
            images: {
              where: { deleted: false },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    return categories.map((category) => ({
      id: category.id,
      category: category.category,
      items: category.menus.map((menu) => ({
        id: menu.id,
        name: menu.menu,
        price: menu.price,
        isNew: menu.new,
        isPopular: menu.popular,
        imgUrl: menu.images.length > 0 ? menu.images[0].image : undefined,
        status: menu.status,
      })),
    }));
  }

  async getMenuDetail({
    menuId,
    storeId,
  }: {
    menuId: number;
    storeId: number;
  }) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: menuId },
      include: {
        images: {
          where: { deleted: false },
          orderBy: { order: 'asc' },
        },
        menuOptions: {
          include: {
            optionDetails: true,
          },
        },
      },
    });

    if (!menu) {
      throw new NotFoundException('해당 메뉴를 찾을 수 없습니다.');
    }

    // 2. 응답 형식 변환
    return {
      id: menu.id.toString(),
      name: menu.menu,
      description: menu.description || '',
      price: menu.price,
      isNew: menu.new,
      isPopular: menu.popular,
      status: menu.status,
      images: menu.images.map((img) => img.image),
      optionGroups: menu.menuOptions.map((opt) => ({
        groupId: opt.id.toString(),
        title: opt.option,
        required: opt.optionRequired,
        minSelectable: opt.minOption,
        maxSelectable: opt.maxOption,
        items: opt.optionDetails.map((detail) => ({
          optionId: detail.id.toString(),
          name: detail.optionDetail,
          price: detail.price,
        })),
      })),
    };
  }
}
