import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountingRecordService } from './accounting-record.service';
import { Prisma } from '@prisma/client';

@Controller('accounting-record')
export class AccountingRecordController {
  constructor(private readonly accountingRecordService: AccountingRecordService) {}

  @Post()
  create(@Body() createAccountingRecordDto: Prisma.AccountingRecordCreateInput) {
    return this.accountingRecordService.create(createAccountingRecordDto);
  }

  @Get()
  findAll() {
    return this.accountingRecordService.findAllDesc();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountingRecordService.findOne(+id);
  }

  @Get('storage/:storageId')
  findByStorageId(@Param('storageId') storageId: string) {
    return this.accountingRecordService.findByStorageId(+storageId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountingRecordDto: Prisma.AccountingRecordUpdateInput) {
    return this.accountingRecordService.update(+id, updateAccountingRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountingRecordService.remove(+id);
  }
}
