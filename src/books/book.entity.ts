import { User } from '../auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity('books')
export  class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    price: number;

    @Column()
    user_id: string;

    @Column()
    active: boolean;

    @ManyToOne(type => User, user => user.books)
    user:User

    @ManyToMany(type => Store, store => store.books)
    stores: any;

    

}