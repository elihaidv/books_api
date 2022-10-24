import { User } from '../auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity('stores')
export  class Store {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    active: boolean = true;

    @Column()
    user_id: string;

    @ManyToOne(type => User, user => user.stores)
    user:User

    @ManyToMany(type => Book, book => book.stores)
    @JoinTable()
    books: Book[]

}