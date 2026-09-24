# Express Todo API

A small REST API built with Express, TypeScript, and PostgreSQL. It supports creating, reading, updating, filtering, and deleting todos.

## Requirements

- Node.js
- pnpm 11 or newer
- PostgreSQL

## Setup

Install dependencies:

```bash
pnpm install
```

Create a PostgreSQL database and add the `todos` table:

```sql
CREATE TABLE IF NOT EXISTS
  todos (
    id serial PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
```

Create a `.env` file in the project root with your PostgreSQL connection details:

```env
PGUSER=postgres
PGHOST=localhost
PGDATABASE=your_database_name
PGPASSWORD=your_password
PGPORT=5432
```

## Run the API

Start the development server with automatic reloads:

```bash
pnpm dev
```

The API is available at `http://localhost:3000`.

To compile and run the production build:

```bash
pnpm build
pnpm start
```

## API Endpoints

### Get all todos

```http
GET /todos
```

### Filter todos by completion status

```http
GET /todos_query?completed=true
GET /todos_query?completed=false
```

The `completed` query parameter is required and must be either `true` or `false`.

### Create a todo

```http
POST /todos
Content-Type: application/json

{
	"title": "Learn Express"
}
```

If no title is provided, the API uses `New Todo`.

### Update a todo

```http
PATCH /todos/1
Content-Type: application/json

{
	"title": "Learn Express and PostgreSQL",
	"completed": true
}
```

Both fields are optional. The existing values are preserved for fields that are omitted.

### Delete a todo

```http
DELETE /todos/1
```

## Project Structure

```text
src/
	db.ts          PostgreSQL connection pool
	index.ts       PostgreSQL-backed Express API
	index.nodb.ts  In-memory version without PostgreSQL
```

`src/index.nodb.ts` is a standalone alternative for experimenting with the API without a database. The default `pnpm dev` command runs the PostgreSQL-backed version.
