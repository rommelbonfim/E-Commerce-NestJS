import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/UpdateOrder.dto';
import { CreateOrderDTO } from './dto/CreateOrder.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Query('userId') userId: string,
    @Body() orderData: CreateOrderDTO,
  ) {
    const createdOrder = await this.orderService.createOrder(
      userId,
      orderData,
    );
    return createdOrder;
  }

  @Get()
  async getUserOrders(@Query('userId') userId: string) {
    const orders = await this.orderService.getUserOrders(userId);
    return orders;
  }

  @Patch(':id')
  updateOrder(
    @Param('id') orderId: string,
    @Body() updateData: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(orderId, updateData);
  }
}
