import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Store } from './store.entity';

@Controller('stores')
export class StoresController {
    constructor(
        @InjectRepository(Store)
        private storeRepository: Repository<Store>,
    ) { }

    @Get()
    findAll(): Promise<Store[]> {
        return this.storeRepository.find();
    }

    @Post()
    async create(@Req() request: Request): Promise<Store> {

        const res = await this.storeRepository.insert(
            new Store(
                //   request.body["title"],
                //   request.body["author"]
            ));
        return this.storeRepository.findOne({ where: { id: res.identifiers[0].id } });
    }

    @Put(':id')
    async update(@Param() params, @Req() request: Request): Promise<Store> {
        const res = await this.storeRepository.update(
            params.id,
            new Store(
                //   request.body["title"],
                //   request.body["author"]
            ));
        return this.storeRepository.findOne({ where: { id: params.id } });
    }

    @Delete(':id')
    async delete(@Param() params): Promise<object> {
        const res = await this.storeRepository.delete(params.id);
        return { "message": "Store deleted" };
    }
}
