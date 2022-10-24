
## Books API exrecise

## Technologies 
- Nest.js as BE framework
- Postgress as DB
- TypeScript as Langauge

- Mailtrap.io as Mailer service
- Stripe.com as Payments service


## Running the app

```bash
$ cp .env .env.example
```

Fill the empty fields

```
# Build Docker image
$ docker-compose build books_server

# Execute App
$ docker-compose up
```

# Test with Postman
Import Postman collection `api.postman_collection.json`

Execute collection `api` with `Run collection` option
