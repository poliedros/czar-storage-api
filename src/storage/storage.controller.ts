import { UpdateStorageDto } from './dto/update-storage.dto';
import { ClientProxy } from '@nestjs/microservices';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';

@Controller('storage')
export class StorageController {
  constructor(
    @Inject('STORAGE_SERVICE') private storageServiceProxy: ClientProxy,
  ) {}

  @Post()
  create(@Body() createStorageDto: CreateStorageDto) {
    return this.storageServiceProxy.send(
      { storage: 'create' },
      createStorageDto,
    );
  }

  @Get()
  findAll() {
    return this.storageServiceProxy.send({ storage: 'findall' }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageServiceProxy.send({ storage: 'find' }, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStorageDto: UpdateStorageDto) {
    updateStorageDto._id = id;
    return this.storageServiceProxy.send(
      { storage: 'patch' },
      updateStorageDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageServiceProxy.send({ storage: 'delete' }, id);
  }
}
