import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

// Define interface for incoming data
export interface CreateLimitOrderDto {
  currencyName: string;
  desirableAssetsPercent: string;
  currencyPrice: string;
  assetsQuantity: string;
  orderValue: string;
  orderType: 'BUY' | 'SELL';
}

@Injectable()
export class LimitOrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateLimitOrderDto) {
    return this.prisma.limitOrder.create({
      data: {
        currencyName: data.currencyName,
        currencyPrice: parseFloat(data.currencyPrice),
        assetsQuantity: parseFloat(data.assetsQuantity),
        orderType: data.orderType,
        status: 'OPEN',
        desirableAssetsPercent: parseFloat(data.desirableAssetsPercent),
        orderValue: parseFloat(data.orderValue),
      },
    });
  }

  async findAll() {
    return this.prisma.limitOrder.findMany();
  }

  async findByCurrencyName(currencyName: string) {
    return this.prisma.limitOrder.findMany({
      where: {
        currencyName: currencyName,
      },
    });
  }
}
