import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { StoresController } from './stores.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Store])],
    controllers: [StoresController],
  })
export class StoresModule {}
