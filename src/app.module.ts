import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIModule } from './openai/openai.module';
import { LimitOrdersModule } from './limit-orders/limit-orders.module';

@Module({
  imports: [OpenAIModule, LimitOrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
