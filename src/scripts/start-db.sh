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
echo "CREATE TABLE IF NOT EXISTS books (ID  SERIAL PRIMARY KEY, title varchar(100), author varchar(100), userId int);" | docker exec -i $SERVER psql -U $USER -d $DB
echo "CREATE TABLE IF NOT EXISTS users (ID  SERIAL PRIMARY KEY, email varchar(100), password varchar(100), refreshToken varchar(500) );" | docker exec -i $SERVER psql -U $USER -d $DB

echo "\l" | docker exec -i $SERVER psql -U postgres -d my_database
