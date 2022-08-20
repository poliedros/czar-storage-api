import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import type { ClientOpts as RedisClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ItemsController } from './items.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'ITEMS_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
          auth_pass: `${process.env.REDIS_AUTH_PASS}`,
        },
      },
    ]),
    CacheModule.register<RedisClientOpts>({
      store: redisStore,
      host: `${process.env.REDIS_HOST}`,
      port: process.env.REDIS_PORT,
      auth_pass: `${process.env.REDIS_AUTH_PASS}`,
    }),
  ],
  controllers: [ItemsController],
})
export class ItemsModule {}
