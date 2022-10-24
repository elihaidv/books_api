import { Book } from '../books/book.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Store } from '../stores/store.entity';
import { Exclude } from 'class-transformer';

@Entity("users")
export  class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    refresh_token: string;

    @Column()
    name: string;

    @OneToMany(type => Book, book => book.user)
    books: Book[];

    @OneToMany(type => Store, store => store.user)
    stores: Store[];

   constructor(email: string = "", password: string = "", name: string = "") {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}