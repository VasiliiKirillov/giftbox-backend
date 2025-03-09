import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StorageService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.StorageCreateInput) {
    return this.prisma.storage.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.storage.findMany();
  }

  async findOne(id: number) {
    return this.prisma.storage.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.StorageUpdateInput) {
    return this.prisma.storage.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.storage.delete({
      where: { id },
    });
  }

  async findByName(name: string) {
    return this.prisma.storage.findFirst({
      where: { name },
    });
  }
}
