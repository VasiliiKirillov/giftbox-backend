import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountingRecordService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AccountingRecordCreateInput) {
    return this.prisma.accountingRecord.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.accountingRecord.findMany();
  }

  async findOne(id: number) {
    return this.prisma.accountingRecord.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.AccountingRecordUpdateInput) {
    return this.prisma.accountingRecord.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.accountingRecord.delete({
      where: { id },
    });
  }

  async findByStorageId(storageId: number) {
    return this.prisma.accountingRecord.findMany({
      where: { storageId },
    });
  }
}
