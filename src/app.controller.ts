import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LimitOrdersService } from './limit-orders/limit-orders.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly limitOrdersService: LimitOrdersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('limit-orders')
  async getLimitOrders(): Promise<string> {
    const orders = await this.limitOrdersService.create();
    return JSON.stringify(orders);
  }
  
  @Get('get-limit-orders')
  async getAllLimitOrders(): Promise<string> {
    const orders = await this.limitOrdersService.findAll();
    return JSON.stringify(orders);
  }
}
