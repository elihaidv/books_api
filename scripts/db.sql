CREATE DATABASE books_database ENCODING 'UTF-8';

\c books_database

CREATE TABLE IF NOT EXISTS books (
    ID SERIAL PRIMARY KEY,
    title varchar(100),
    author varchar(100),
    user_id int,
    price real,
    active boolean
);

CREATE TABLE IF NOT EXISTS stores (
    ID SERIAL PRIMARY KEY,
    name varchar(100),
    address varchar(100),
    user_id int,
    active boolean
);

CREATE TABLE IF NOT EXISTS stores_books_books (
    ID SERIAL PRIMARY KEY,
    stores_id int,
    books_id int
);

CREATE TABLE IF NOT EXISTS carts (
    ID SERIAL PRIMARY KEY,
    user_id int,
    status int
);

CREATE TABLE IF NOT EXISTS carts_books_books (
    ID SERIAL PRIMARY KEY,
    carts_id int,
    books_id int
);

CREATE TABLE IF NOT EXISTS orders (
    ID SERIAL PRIMARY KEY,
    user_id int,
    status int,
    cart_id int,
    charge_id varchar(100)
);

CREATE TABLE IF NOT EXISTS users (
    ID SERIAL PRIMARY KEY,
    email varchar(100),
    password varchar(100),
    name varchar(100),
    refresh_token varchar(500)
);