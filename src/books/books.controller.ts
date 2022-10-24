import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { OwnershipService } from '../auth/ownership.service';

@Controller('books')
export class BooksController {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private ownershipService: OwnershipService
  ) { }

  @Get()
  async findAll(@Req() request: Request): Promise<Book[]> {
    return this.bookRepository.find({where: {active: true}});
  }

  @Post()
  async create(@Req() request: Request): Promise<Book> {

    const book = Object.assign(new Book(), request.body);
    book.user_id = request.user["id"];
    await this.bookRepository.save(book);

    return book;
  }

  @Put(':id')
  async update( @Req() request: Request): Promise<Book> {
    await this.ownershipService.checkUserOwnership(request, this.bookRepository);

    await this.bookRepository.update(request.params.id,request.body);

    return this.bookRepository.findOne({ where: { id: request.params.id } });
  }

  @Delete(':id')
  async delete(@Req() request: Request): Promise<object> {
    await this.ownershipService.checkUserOwnership(request, this.bookRepository);

    await this.bookRepository.delete(request.params.id);

    return { "message": "Book deleted" };
  }

 

}
