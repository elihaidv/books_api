import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/book.entity';
import { OwnershipService } from '../auth/ownership.service';
import { Store } from './store.entity';
import { StoresController } from './stores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Store,Book])],
  controllers: [StoresController],
  providers: [OwnershipService],
})
export class StoresModule { }
