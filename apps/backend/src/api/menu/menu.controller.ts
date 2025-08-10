import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { StoreId } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateMenuDto } from './dto/create-menu.dto';
import { CreateOptionsDto } from './dto/create-option.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { UpdateMenuDetailsDto } from './dto/update-menu-details.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import { CreateMenusSwagger } from './swagger/create-menus.swagger';
import { CreateOptionSwagger } from './swagger/create-option.swagger';
import { DeleteMenuSwagger } from './swagger/delete-menu.swagger';
import { GetMenusByCategorySwagger } from './swagger/get-menus-by-category.swagger';
import { UpdateMenuDetailsSwagger } from './swagger/update-menu-details.swagger';
import { UpdateMenusSwagger } from './swagger/update-menus.swagger';
const allAuthorization = [
  'pin-authorization',
  'mobile-authorization',
  'admin-authorization',
];
const adminAuthorization = ['admin-authorization'];
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  //메뉴 생성하기
  @Post()
  @CreateMenusSwagger()
  @UseGuards(JwtAuthGuard(adminAuthorization))
  async createMenus(
    @Body() createMenusDtos: CreateMenuDto[],
    @StoreId() storeId: number,
  ) {
    return await this.menuService.createMenus({ createMenusDtos, storeId });
  }

  //메뉴 삭제하기
  @UseGuards(JwtAuthGuard(adminAuthorization))
  @Delete(':menuId')
  @DeleteMenuSwagger()
  async deleteMenu(
    @Param('menuId') menuId: number,
    @StoreId() storeId: number,
  ) {
    return await this.menuService.deleteMenu({ menuId, storeId });
  }

  //메뉴 카테고리로 불러오기
  @UseGuards(JwtAuthGuard(allAuthorization))
  @Get('/categoryId/:categoryId')
  @GetMenusByCategorySwagger()
  async getMenus(
    @Param('categoryId') categoryId: number,
    @StoreId() storeId: number,
  ) {
    return await this.menuService.getMenusByCategory({ categoryId, storeId });
  }

  //메뉴 상세 정보 수정하기
  @UpdateMenuDetailsSwagger()
  @UseGuards(JwtAuthGuard(adminAuthorization))
  @Patch('/:menuId')
  async updateMenuDetails(
    @Param('menuId') menuId: number,
    @Body() updateMenuDetailsDto: UpdateMenuDetailsDto,
    @StoreId() storeId: number,
  ) {
    return await this.menuService.updateMenuDetails({
      updateMenuDetailsDto,
      storeId,
      menuId,
    });
  }

  //메뉴 기본정보 여러개 수정하기
  @UpdateMenusSwagger()
  @UseGuards(JwtAuthGuard(adminAuthorization))
  @Patch()
  async updateMenus(
    @Body() updateMenusDtos: UpdateMenuDto[],
    @StoreId() storeId: number,
  ) {
    const result = this.menuService.updateMenus({ updateMenusDtos, storeId });
    return result;
  }

  //메뉴 상세장보 가져오기

  //옵션 등록하기
  @Post('/option')
  @UseGuards(JwtAuthGuard(adminAuthorization))
  @CreateOptionSwagger()
  async createOption(@Body() createOptionDto: CreateOptionsDto) {
    return await this.menuService.createOption({ createOptionDto });
  }

  //사진
  @Post('/:menuId/image')
  @UseGuards(JwtAuthGuard(adminAuthorization))
  async updateImages(
    @Body() updateImageDtos: UpdateImageDto[],
    @Param('menuId') menuId: number,
    @StoreId() storeId: number,
  ) {
    return await this.menuService.updateImage({
      updateImageDtos,
      menuId,
      storeId,
    });
  }
}
