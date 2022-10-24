#!/bin/bash
set -e

SERVER="my_database_server";
PW="mysecretpassword";
DB="my_database";
USER="postgres"

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
sleep 3;

# create the db 
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
# echo "DROP TABLE book;" | docker exec -i $SERVER psql -U postgres -d my_database
echo "CREATE TABLE IF NOT EXISTS books (ID  SERIAL PRIMARY KEY, title varchar(100), author varchar(100), user_id int, price real, active boolean);" | docker exec -i $SERVER psql -U $USER -d $DB
echo "CREATE TABLE IF NOT EXISTS stores (ID  SERIAL PRIMARY KEY, name varchar(100), address varchar(100), user_id int, active boolean);" | docker exec -i $SERVER psql -U $USER -d $DB
echo "CREATE TABLE IF NOT EXISTS stores_books_books (ID  SERIAL PRIMARY KEY, stores_id int, books_id int);" | docker exec -i $SERVER psql -U $USER -d $DB
echo "CREATE TABLE IF NOT EXISTS carts (ID  SERIAL PRIMARY KEY, user_id int, status int);" | docker exec -i $SERVER psql -U $USER -d $DB
echo "CREATE TABLE IF NOT EXISTS carts_books_books (ID  SERIAL PRIMARY KEY, carts_id int, books_id int);" | docker exec -i $SERVER psql -U $USER -d $DB
echo "CREATE TABLE IF NOT EXISTS orders (ID  SERIAL PRIMARY KEY, user_id int, status int, cart_id int, charge_id varchar(100));" | docker exec -i $SERVER psql -U $USER -d $DB
echo "CREATE TABLE IF NOT EXISTS users (ID  SERIAL PRIMARY KEY, email varchar(100), password varchar(100), name varchar(100), refresh_token varchar(500) );" | docker exec -i $SERVER psql -U $USER -d $DB

echo "\l" | docker exec -i $SERVER psql -U $USER -d $DB
