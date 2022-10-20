import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartsController } from './carts.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Cart])],
    controllers: [CartsController],
  })
export class CartsModule {}
