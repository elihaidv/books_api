import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export  class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}