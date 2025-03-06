import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIModule } from './openai/openai.module';
import { LimitOrdersModule } from './limit-orders/limit-orders.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [OpenAIModule, LimitOrdersModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
