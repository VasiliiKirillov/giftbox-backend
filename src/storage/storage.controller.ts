import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StorageService } from './storage.service';
import { Prisma } from '@prisma/client';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  create(@Body() createStorageDto: Prisma.StorageCreateInput) {
    return this.storageService.create(createStorageDto);
  }

  @Get()
  findAll() {
    return this.storageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStorageDto: Prisma.StorageUpdateInput) {
    return this.storageService.update(+id, updateStorageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageService.remove(+id);
  }
}
