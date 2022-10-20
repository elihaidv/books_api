import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) { }

    @Get()
    findAll(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    @Post()
    async create(@Req() request: Request): Promise<Order> {

        const res = await this.orderRepository.insert(
            new Order(
                //   request.body["title"],
                //   request.body["author"]
            ));
        return this.orderRepository.findOne({ where: { id: res.identifiers[0].id } });
    }

    @Put(':id')
    async update(@Param() params, @Req() request: Request): Promise<Order> {
        const res = await this.orderRepository.update(
            params.id,
            new Order(
                //   request.body["title"],
                //   request.body["author"]
            ));
        return this.orderRepository.findOne({ where: { id: params.id } });
    }

}
