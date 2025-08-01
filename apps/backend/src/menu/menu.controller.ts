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

import { CreateMenusDto } from './dto/create-menus.dto';
import { UpdateMenusDto } from './dto/update-menus.dto';
import { MenuService } from './menu.service';
import { CreateMenusSwagger } from './swagger/create-menus.swagger';
import { DeleteMenuSwagger } from './swagger/delete-menu.swagger';
import { GetMenusByCategorySwagger } from './swagger/get-menus-by-category.swagger';
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
    @Body() createMenusDtos: CreateMenusDto[],
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

  //메뉴 상세 정보 등록하기

  //메뉴 상세 정보 수정하기

  //메뉴 기본정보 여러개 수정하기
  @UpdateMenusSwagger()
  @UseGuards(JwtAuthGuard(adminAuthorization))
  @Patch()
  async updateMenus(
    @Body() updateMenusDtos: UpdateMenusDto[],
    @StoreId() storeId: number,
  ) {
    return await this.menuService.updateMenus({ updateMenusDtos, storeId });
  }
  //  @UpdateMenuSwagger()
  //메뉴 상세장보 가져오기

  //옵션
  //옵션 등록하기

  //사진
}
