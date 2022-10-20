import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('books')
export  class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;


    @Column()
    author: string;

   constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }
}