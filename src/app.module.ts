import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { ItemsModule } from './items/items.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [AuthModule, UsersModule, HealthModule, ItemsModule, StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
