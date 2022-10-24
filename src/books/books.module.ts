import { Module, UseGuards } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnershipService } from '../auth/ownership.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Book } from './book.entity';
import { BooksController } from './books.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    OwnershipService
  ],
})
export class BooksModule {}