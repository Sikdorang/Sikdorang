import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { StoreId, TableNumber } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { CreateOrderSwagger } from './swagger/create-order.swagger';
import { GetOrderSwagger } from './swagger/get-order.swagger';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(
    JwtAuthGuard([
      'pin-authorization',
      'mobile-authorization',
      'admin-authorization',
    ]),
  )
  @Post()
  @CreateOrderSwagger()
  async create(
    @StoreId() storeId: number,
    @Body() createOrderDto: CreateOrderDto,
    @TableNumber() tableNumber: number,
    @Req() req: any,
  ) {
    if (tableNumber == -1 && createOrderDto.tableNumber) {
      tableNumber = createOrderDto.tableNumber;
    }

    const token: string = req.headers[req.user.tokenType]
      .split(' ')[1]
      .split('.')[2];

    return await this.orderService.createOrder({
      storeId,
      createOrderDto,
      tableNumber,
      token,
    });
  }
  @UseGuards(
    JwtAuthGuard([
      'pin-authorization',
      'mobile-authorization',
      'admin-authorization',
    ]),
  )
  @Get('/store')
  @GetOrderSwagger()
  async getOrderByStoreId(@StoreId() storeId: number) {
    return await this.orderService.getOrders({
      storeId,
    });
  }

  @UseGuards(
    JwtAuthGuard([
      'pin-authorization',
      'mobile-authorization',
      'admin-authorization',
    ]),
  )
  @Get('/user')
  @GetOrderSwagger()
  async getOrderByUserId(@StoreId() storeId: number, @Req() req: any) {
    const token: string = req.headers[req.user.tokenType]
      .split(' ')[1]
      .split('.')[2];

    return await this.orderService.getOrders({
      storeId,
      token,
    });
  }
}
