import { CacheModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import type { ClientOpts as RedisClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'CATALOG_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
          auth_pass: `${process.env.REDIS_AUTH_PASS}`,
        },
      },
    ]),
    CacheModule.register<RedisClientOpts>({
      store: redisStore,
      // Store-specific configuration:
      host: `${process.env.REDIS_HOST}`,
      port: process.env.REDIS_PORT,
      auth_pass: `${process.env.REDIS_AUTH_PASS}`,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class CatalogModule {}
