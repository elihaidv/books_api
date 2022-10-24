import { Cart } from '../carts/cart.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Expose, Transform } from 'class-transformer';
import { User } from '../auth/user.entity';


export enum OrderStatus {
    NEW,
    COMPLETED,
    CANCELLED,
    FAILED
}
@Entity('orders')
export  class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => Cart, cart => cart.order)
    @JoinColumn()
    cart: Cart;

    @Column()
    @Transform(({value}) => OrderStatus[value])
    status: OrderStatus = OrderStatus.NEW;

    @ManyToOne(type => User, user => user.books)
    user:User

    @Column()
    user_id: string;


    @Column()
    chargeId: string;

    @Expose()
    get total(): number {
        return this.cart.books.reduce((total, book) => total + book.price, 0);
    }
}