import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../carts/cart.entity';
import { OwnershipService } from '../auth/ownership.service';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { EmailService } from '../emails/EmailService';
import { User } from '../auth/user.entity';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, User, Order])],
  controllers: [OrdersController],
  providers: [OwnershipService, EmailService,PaymentsService,]
})
export class OrdersModule { }
