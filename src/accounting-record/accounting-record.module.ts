import { Module } from '@nestjs/common';
import { AccountingRecordController } from './accounting-record.controller';
import { AccountingRecordService } from './accounting-record.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AccountingRecordController],
  providers: [AccountingRecordService, PrismaService],
  exports: [AccountingRecordService],
})
export class AccountingRecordModule {}
