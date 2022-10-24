import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/book.entity';
import { OwnershipService } from '../auth/ownership.service';
import { Cart } from './cart.entity';
import { CartsController } from './carts.controller';

@Module({
    imports: [
      TypeOrmModule.forFeature([Cart, Book]),
  ],
    controllers: [CartsController],
    providers: [OwnershipService],
  })
export class CartsModule {}
