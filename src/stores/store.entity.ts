import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export  class Store {
    @PrimaryGeneratedColumn('uuid')
    id: string;

}