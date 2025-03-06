import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LimitOrdersService } from './limit-orders.service';
import { CreateLimitOrderDto } from './limit-orders.service';

@Controller('limit-orders')
export class LimitOrdersController {
  constructor(private readonly limitOrdersService: LimitOrdersService) {}

  @Post()
  async createLimitOrder(@Body() createLimitOrderDto: CreateLimitOrderDto) {
    const order = await this.limitOrdersService.create(createLimitOrderDto);
    return order;
  }

  @Get()
  async getAllLimitOrders() {
    const orders = await this.limitOrdersService.findAll();
    return orders;
  }

  @Get('by-currency')
  async getLimitOrdersByCurrency(@Query('currency') currencyName: string) {
    const orders = await this.limitOrdersService.findByCurrencyName(currencyName);
    return orders;
  }
}
