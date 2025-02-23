import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LimitOrdersService {
    constructor(private prisma: PrismaService) { }

    async create(/* data: {
        price: number;
        amount: number;
        side: 'BUY' | 'SELL';
    } */) {
        return this.prisma.limitOrder.create({
            data: {
                price: 100,
                amount: 50,
                side: 'BUY',
                // price: data.price,
                // amount: data.amount,
                // side: data.side,
                status: 'OPEN',
            },
        });
    }

    async findAll() {
        return this.prisma.limitOrder.findMany();
    }
} 
