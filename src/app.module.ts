import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { LimitOrdersService } from './limit-orders/limit-orders.service';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [OpenAIModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, LimitOrdersService],
})
export class AppModule {}
