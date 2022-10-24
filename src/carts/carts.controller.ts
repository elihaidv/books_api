import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OwnershipService } from '../auth/ownership.service';
import { Repository } from 'typeorm';
import { Cart, CartStatus } from './cart.entity';
import { Book } from '../books/book.entity';

@Controller('carts')
export class CartsController {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private ownershipService: OwnershipService
  ) { }

  @Get(':id')
  getCurrent(@Req() request: Request): Promise<Cart> {
    const currentCart = this.cartRepository.findOne({ where: { user_id: request.user["id"], status: CartStatus.OPEN }, relations: ["books"] });
    if (!currentCart) {
      throw new HttpException("Open cart not found", HttpStatus.NOT_FOUND);
    }
    return currentCart;
    
  }
  @Post()
  async create(@Req() request: Request): Promise<Cart> {

    let currentCart = await this.cartRepository.findOne({ where: { user_id: request.user["id"], status: CartStatus.OPEN }, relations: ["books"] });
    if (!currentCart) {
      currentCart = new Cart();
      currentCart.user_id = request.user["id"];
      currentCart.books = [];
    }
    const book = await this.bookRepository.findOne({ where: { id: request.body.book_id } });
    if (!book) {
      throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
    }
    if (currentCart.books.find(b => b.id === book.id)) {
      throw new HttpException("Book already in cart", HttpStatus.BAD_REQUEST);
    }

    currentCart.books.push(book);
    await this.cartRepository.save(currentCart);

    return currentCart;
  }

  @Delete(':id')
  async close(@Req() request: Request): Promise<Cart> {
    let currentCart = await this.cartRepository.findOne({ where: { user_id: request.user["id"], status: CartStatus.OPEN }, relations: ["books"] });
    if (!currentCart) {
      throw new HttpException("Open cart not found", HttpStatus.NOT_FOUND);
    }

    currentCart.status = CartStatus.CANCELLED;
    await this.cartRepository.save(currentCart);


    return currentCart;
  }




}
