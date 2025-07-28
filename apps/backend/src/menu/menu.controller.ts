import { Controller, Delete, Param, UseGuards } from '@nestjs/common';

import { StoreId } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { MenuService } from './menu.service';
import { DeleteMenuSwagger } from './swagger/delete-menu.swagger';

const jwtAuthGuard = JwtAuthGuard([
  'pin-authorization',
  'mobile-authorization',
]);
const adminJwtAuthGuard = JwtAuthGuard(['admin-authorization']);
const mobileJwtAuthGaurd = JwtAuthGuard(['mobile-authorization']);
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  //  @Post()
  //  @CreateMenuSwagger()
  //  async create(@Body() dto: CreateMenuDto, @StoreId() storeId: number) {
  //    return await this.menuService.createMenu(dto, storeId);
  //  }
  @UseGuards(mobileJwtAuthGaurd)
  @Delete(':menuId')
  @DeleteMenuSwagger()
  async delete(@Param('menuId') menuId: number, @StoreId() storeId: number) {
    return await this.menuService.deleteMenu(menuId, storeId);
  }
}
