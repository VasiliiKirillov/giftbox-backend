import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { LimitOrdersService } from './limit-orders/limit-orders.service';
import { CreateLimitOrderDto } from './limit-orders/limit-orders.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly limitOrdersService: LimitOrdersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('limit-orders')
  async getLimitOrders(@Body() createLimitOrderDto: CreateLimitOrderDto) {
    const order = await this.limitOrdersService.create(createLimitOrderDto);
    return order;
  }

  @Get('limit-orders')
  async getAllLimitOrders() {
    const orders = await this.limitOrdersService.findAll();
    return orders;
  }

  @Get('limit-orders/by-currency')
  async getLimitOrdersByCurrency(@Query('currency') currencyName: string) {
    const orders = await this.limitOrdersService.findByCurrencyName(currencyName);
    return orders;
  }
}
