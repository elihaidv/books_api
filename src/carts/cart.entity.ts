import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export  class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

}