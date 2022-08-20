import { CreateItemDto } from './dto/create-item.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('items')
export class ItemsController {
  constructor(
    @Inject('ITEMS_SERVICE') private itemsServiceProxy: ClientProxy,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createItemDto: CreateItemDto) {
    createItemDto.userId = req.user.id;
    return this.itemsServiceProxy.send({ items: 'create' }, createItemDto);
  }

  @Get()
  async findAll(@Query() query) {
    let { storage_id } = query;

    if (!storage_id) storage_id = '';

    return this.itemsServiceProxy.send({ items: 'findall' }, storage_id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemsServiceProxy.send({ items: 'find' }, { id });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    updateItemDto._id = id;
    return this.itemsServiceProxy.send({ items: 'patch' }, updateItemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.itemsServiceProxy.send({ items: 'remove' }, id);
  }
}
