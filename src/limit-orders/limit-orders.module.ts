import { Module } from '@nestjs/common';
import { LimitOrdersController } from './limit-orders.controller';
import { LimitOrdersService } from './limit-orders.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [LimitOrdersController],
  providers: [LimitOrdersService, PrismaService],
  exports: [LimitOrdersService],
})
export class LimitOrdersModule {}
