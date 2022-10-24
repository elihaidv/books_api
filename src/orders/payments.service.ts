import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order, OrderStatus } from "./order.entity";
const stripe = require('stripe')

@Injectable()
export class PaymentsService {

    stripeService = stripe(process.env.STRIP_API_KEY);


    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

    ) { }

    async pay(order: Order): Promise<any> {

        const charge = await this.stripeService.charges.create({
            amount: order.total * 100,
            currency: 'ils',
            source: 'tok_amex',
            description: `Books order number: ${order.id}`,

        });

        if (charge.status === 'succeeded') {
            order.status = OrderStatus.COMPLETED;
            order.chargeId = charge.id;
        } else {
            order.status = OrderStatus.FAILED;
        }
        await this.orderRepository.save(order);

    }

    async refund(order: Order): Promise<any> {

        const refund = await this.stripeService.refunds.create({
            charge: order.chargeId,
        });

        if (refund.status === 'succeeded') {
            order.status = OrderStatus.CANCELLED;
        } else {
            order.status = OrderStatus.FAILED;
        }
        await this.orderRepository.save(order);

    }
}