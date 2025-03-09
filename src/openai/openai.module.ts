import { Module } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { OpenAIController } from './openai.controller';
import { StorageModule } from '../storage/storage.module';
import { AccountingRecordModule } from '../accounting-record/accounting-record.module';

@Module({
  imports: [StorageModule, AccountingRecordModule],
  controllers: [OpenAIController],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
