import { ProductDto } from './dto/product.dto';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { mock } from 'jest-mock-extended';

describe('ProductService', () => {
  let service: ProductsService;
  const catalogServiceProxyProvider = mock<ClientProxy>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: 'CATALOG_SERVICE',
          useValue: catalogServiceProxyProvider,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should create be working', async () => {
    await service.create({
      name: 'pizza',
      description: 'cheese',
      price: 21,
      tags: ['spice'],
    });

    expect(catalogServiceProxyProvider.emit.mock.calls.length).toEqual(1);
  });

  it('should findAll be working', async () => {
    const product: ProductDto = {
      name: 'pizza',
      description: 'a good pizza for a good consumer',
      price: 21,
      tags: ['spice'],
    };

    const productsObservable = new Observable<ProductDto>((o) =>
      o.next(product),
    );

    catalogServiceProxyProvider.send.mockImplementation(() => {
      return productsObservable;
    });

    const products = await service.findAll();

    // README: don't know if this is working as it should
    expect(products).toEqual(productsObservable);
  });
});
