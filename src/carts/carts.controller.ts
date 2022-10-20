import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Controller('carts')
export class CartsController {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) { }

    @Get()
    findAll(): Promise<Cart[]> {
        return this.cartRepository.find();
    }

    @Post()
    async create(@Req() request: Request): Promise<Cart> {

        const res = await this.cartRepository.insert(
            new Cart(
                //   request.body["title"],
                //   request.body["author"]
            ));
        return this.cartRepository.findOne({ where: { id: res.identifiers[0].id } });
    }

    @Put(':id')
    async update(@Param() params, @Req() request: Request): Promise<Cart> {
        const res = await this.cartRepository.update(
            params.id,
            new Cart(
                //   request.body["title"],
                //   request.body["author"]
            ));
        return this.cartRepository.findOne({ where: { id: params.id } });
    }

    @Delete(':id')
    async delete(@Param() params): Promise<object> {
        const res = await this.cartRepository.delete(params.id);
        return { "message": "Cart deleted" };
    }
}
