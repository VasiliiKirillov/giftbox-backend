import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { LimitOrdersService } from './limit-orders/limit-orders.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, LimitOrdersService],
})
export class AppModule {}
