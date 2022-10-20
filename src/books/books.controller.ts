import { Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) { }

  @Get()
  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  @Post()
  async create(@Req() request: Request): Promise<Book> {

    const res = await this.bookRepository.insert(
      new Book(
        request.body["title"],
        request.body["author"]
      ));
    return this.bookRepository.findOne({ where: { id: res.identifiers[0].id } });
  }

  @Put(':id')
  async update(@Param() params, @Req() request: Request): Promise<Book> {
    const res = await this.bookRepository.update(
      params.id,
      new Book(
        request.body["title"],
        request.body["author"]
      ));
    return this.bookRepository.findOne({ where: { id: params.id } });
  }

  @Delete(':id')
  async delete(@Param() params): Promise<object> {
    const res = await this.bookRepository.delete(params.id);
    return { "message": "Book deleted" };
  }

}
