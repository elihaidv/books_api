import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { AuthController } from './auth/auth.controller';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';
import { StoresController } from './stores/stores.controller';
import { OrdersController } from './orders/orders.controller';
import { CartsController } from './carts/carts.controller';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { StoresModule } from './stores/stores.module';
import { Cart } from './carts/cart.entity';
import { Order } from './orders/order.entity';
import { Store } from './stores/store.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env['POSTGRES_HOST'],
      port: parseInt(process.env['POSTGRES_PORT']),
      username: process.env['POSTGRES_USER'],
      password: process.env['POSTGRES_PASSWORD'],
      database: process.env['POSTGRES_DATABASE'],

      entities: [Book, Cart, Order, Store, User],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

    }),
    BooksModule,
    CartsModule,
    OrdersModule,
    StoresModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
