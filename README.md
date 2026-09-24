## Starter Template

https://github.com/it-for-ie-69/express-template

## Todo Without DB

https://github.com/it-for-ie-69/express-intro/blob/main/src/index_2.ts

## Postgres DB with Docker

`docker run -d --name my-postgres -e POSTGRES_PASSWORD=1234 -v pgdata:/var/lib/postgresql -p 5432:5432 postgres:latest`

```sql
CREATE DATABASE app_db;
```

```sql
CREATE TABLE IF NOT EXISTS
  todos (
    id serial PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
```
