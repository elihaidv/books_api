import { ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OwnershipService } from '../auth/ownership.service';
import { In, Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { Cart, CartStatus } from '../carts/cart.entity';
import { EmailService } from '../emails/EmailService';
import { User } from '../auth/user.entity';
import { PaymentsService } from './payments.service';

@Controller('orders')
export class OrdersController {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private ownershipService: OwnershipService,
        private emailService: EmailService,
        private paymentsService: PaymentsService
    
    ) { }


    @Get()
    findAll(@Req() request: Request): Promise<Order[]> {
        return this.orderRepository.find({ where: { user_id: request.user["id"] }, relations: ["cart", "cart.books"] });
    }

    @Post()
    async create(@Req() request: Request): Promise<Order> {
       
        let currentCart = await this.cartRepository.findOne({ where: { user_id: request.user["id"], status: CartStatus.OPEN }, relations: ["books"] });
        if (!currentCart) {
            throw new HttpException("Open cart not found", HttpStatus.NOT_FOUND);
        }

        const user = await this.userRepository.findOne({ where: { id: request.user["id"] } });

        const order = new Order();
        order.user = user;
        order.cart = currentCart;
        await this.orderRepository.save(order);
        
        currentCart.status = CartStatus.COMPLETED;
        await this.cartRepository.save(currentCart);

        this.emailService.sendOnOrderCreated(order);

        this.paymentsService.pay(order);

        return order;
    }

    @Delete(':id')
    async delete(@Req() request: Request): Promise<object> {
        await this.ownershipService.checkUserOwnership(request, this.orderRepository);

        const order = await this.orderRepository.findOne({ where: { id: request.params.id }, relations: ["cart", "cart.books","user"] });

        if (order.status === OrderStatus.CANCELLED) {
            throw new HttpException("Order already cancelled", HttpStatus.BAD_REQUEST);
        }

        order.status = OrderStatus.CANCELLED;
        await this.orderRepository.save(order);

        this.emailService.sendOrderRefund(order);
        this.paymentsService.refund(order);

        return order;
    }



}
