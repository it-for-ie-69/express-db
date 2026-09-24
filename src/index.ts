import express from "express";
import { pool } from "./db.js";

//Intializing the express app
const app = express();
app.use(express.json());

app.get("/todos", async (req, res) => {
  const query = await pool.query("SELECT * from todos;");
  res.json(query.rows);
});

app.get("/todos_query", async (req, res) => {
  const completed = req.query.completed;

  if (completed === "true") {
    const query = await pool.query(
      "SELECT * from todos WHERE completed = $1;",
      [true],
    );
    res.json(query.rows);
  } else if (completed === "false") {
    const query = await pool.query(
      "SELECT * from todos WHERE completed = $1;",
      [false],
    );
    res.json(query.rows);
  } else {
    res.status(400).json({
      error:
        "Invalid query parameter. Use 'completed=true' or 'completed=false'",
    });
  }
});

app.post("/todos", async (req, res) => {
  const query = await pool.query(
    "INSERT INTO todos (title) VALUES ($1) RETURNING *;",
    [req.body.title || "New Todo"],
  );
  res.status(201).json(query.rows);
});

app.delete("/todos/:id", async (req, res) => {
  const todoId = Number(req.params.id);

  const query = await pool.query(
    "DELETE FROM todos WHERE id = $1 RETURNING *;",
    [todoId],
  );

  if (query.rows.length > 0) {
    res.status(200).json({ message: "Todo deleted successfully" });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  const todoId = Number(req.params.id);

  const queryTodo = await pool.query("SELECT * from todos WHERE id = $1", [
    todoId,
  ]);
  if (queryTodo.rows.length !== 1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const todo = queryTodo.rows[0];
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  const query = await pool.query(
    "UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *;",
    [todo.title, todo.completed, todo.id],
  );
  res.status(200).json(query.rows);
});

// Running app
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
