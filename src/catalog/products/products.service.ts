import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('CATALOG_SERVICE') private catalogServiceProxy: ClientProxy,
  ) {}

  async create(createProductDto: CreateProductDto) {
    this.catalogServiceProxy.emit<CreateProductDto>(
      'catalog/create_product',
      createProductDto,
    );
  }

  async findAll(): Promise<Observable<ProductDto>> {
    return this.catalogServiceProxy.send<ProductDto>(
      'catalog/find_products',
      {},
    );
  }
}
