import { Body, Controller, Get, Post, Req, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { $Enums } from '@prisma/client';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.id, dto.items);
  }

  @Get()
  async findMyOrders(@Req() req) {
    return this.ordersService.getUserOrders(req.user.id);
  }

  // ---- CANCEL ORDER ----
  @Post(':id/cancel')
  async cancel(@Req() req, @Param('id') id: string) {
    return this.ordersService.cancelOrder(req.user.id, Number(id));
  }

  // ---- ADMIN / KITCHEN STATUS UPDATE ----
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: $Enums.OrderStatus,
  ) {
    return this.ordersService.updateStatus(Number(id), status);
  }
}
