import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    await this.productService.create(createProductDto);
  }

  @Get()
  @CacheTTL(300)
  @UseInterceptors(CacheInterceptor)
  async get() {
    return await this.productService.findAll();
  }
}
