import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { StoreId, TableNumber } from '../auth/decorators/auth-ids.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { CreateOrderSwagger } from './swagger/createOrder.swagger';
const allAuthorization = [
  'pin-authorization',
  'mobile-authorization',
  'admin-authorization',
];

const pinAuthorization = ['pin-authorization'];
const orderAuthorization = ['pin-authorization', 'mobile-authorization'];
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard(orderAuthorization))
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
}
