import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';

import { StoreId } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { MenuService } from './menu.service';
import { DeleteMenuSwagger } from './swagger/delete-menu.swagger';
import { GetMenusByCategorySwagger } from './swagger/get-menus-by-category.swagger';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  //  @Post()
  //  @CreateMenuSwagger()
  //  async create(@Body() dto: CreateMenuDto, @StoreId() storeId: number) {
  //    return await this.menuService.createMenu(dto, storeId);
  //  }
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
