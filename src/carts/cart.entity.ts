import { Book } from '../books/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToMany, OneToMany, ManyToOne, JoinTable, OneToOne } from 'typeorm';
import { Store } from '../stores/store.entity';
import { Order } from '../orders/order.entity';
import { Transform } from 'class-transformer';

export enum CartStatus {
    OPEN = 0,
    COMPLETED = 1,
    CANCELLED = 2
}
@Entity('carts')
export  class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToMany(type => Book)
    @JoinTable()
    books: Book[]

    @OneToOne(type => Order)
    order:Order

    @Column()
    @Transform(({value}) => CartStatus[value])
    status: CartStatus = CartStatus.OPEN;

    @Column()
    user_id: string;
}