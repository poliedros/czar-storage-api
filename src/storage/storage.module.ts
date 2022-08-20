import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StorageController } from './storage.controller';

const REDIS = 1;

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'STORAGE_SERVICE',
        transport: REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          password: `${process.env.REDIS_AUTH_PASS}`,
        },
      },
    ]),
  ],
  controllers: [StorageController],
})
export class StorageModule {}
