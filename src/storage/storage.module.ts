import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StorageController } from './storage.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'STORAGE_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
          auth_pass: `${process.env.REDIS_AUTH_PASS}`,
        },
      },
    ]),
  ],
  controllers: [StorageController],
})
export class StorageModule {}
