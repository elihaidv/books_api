import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OwnershipService } from '../auth/ownership.service';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { Book } from '../books/book.entity';

@Controller('stores')
export class StoresController {
    constructor(
        @InjectRepository(Store)
        private storeRepository: Repository<Store>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        private ownershipService: OwnershipService

    ) { }

    @Get()
    findAll(): Promise<Store[]> {
        return this.storeRepository.find({where: {active: true}});
    }

    @Post()
    async create(@Req() request: Request): Promise<Store> {

        const store = Object.assign(new Store(), request.body);
        store.user_id = request.user["id"];
        await this.storeRepository.save(store);

        return store;
    }

    @Put(':id')
    async update(@Req() request: Request): Promise<Store> {
        await this.ownershipService.checkUserOwnership(request, this.storeRepository);

        if (request.body.book_id) {
            const store = await this.storeRepository.findOne({ where: { id: request.params.id }, relations: ["books"] });
            const book = await this.bookRepository.findOne({ where: { id: request.body.book_id } });
            store.books.push(book);
            await this.storeRepository.save(store);
            return store;
        }

        await this.storeRepository.update(request.params.id, request.body);

        return this.storeRepository.findOne({ where: { id: request.params.id } });
    }


    @Delete(':id')
    async delete(@Req() request: Request): Promise<object> {
        await this.ownershipService.checkUserOwnership(request, this.storeRepository);
        const res = await this.storeRepository.delete(request.params.id);
        return { "message": "Store deleted" };
    }
}
