import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { StoreId } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateMenusDto } from './dto/create-menu.dto';
import { MenuService } from './menu.service';
import { CreateMenuSwagger } from './swagger/create-menu.swagger';
import { DeleteMenuSwagger } from './swagger/delete-menu.swagger';
import { GetMenusByCategorySwagger } from './swagger/get-menus-by-category.swagger';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @CreateMenuSwagger()
  @UseGuards(JwtAuthGuard(['admin-authorization']))
  async create(
    @Body() createMenusDtos: CreateMenusDto[],
    @StoreId() storeId: number,
  ) {
    return await this.menuService.createMenus({ createMenusDtos, storeId });
  }

  @UseGuards(JwtAuthGuard(['admin-authorization']))
  @Delete(':menuId')
  @DeleteMenuSwagger()
  async delete(@Param('menuId') menuId: number, @StoreId() storeId: number) {
    return await this.menuService.deleteMenu({ menuId, storeId });
  }

  @UseGuards(
    JwtAuthGuard([
      'pin-authorization',
      'mobile-authorization',
      'admin-authorization',
    ]),
  )
  @Get('/categoryId/:categoryId')
  @GetMenusByCategorySwagger()
  async getMenus(
    @Param('categoryId') categoryId: number,
    @StoreId() storeId: number,
  ) {
    return await this.menuService.getMenusByCategory({ categoryId, storeId });
  }
}
