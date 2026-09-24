import express from "express";

//Intializing the express app
const app = express();
app.use(express.json());

// Part 2: Todo API
// Sample in-memory data for todos
const todos = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Build a REST API", completed: false },
  { id: 3, title: "Deploy the application", completed: true },
];
let nextTodoId = 4;

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos_query", (req, res) => {
  const completed = req.query.completed;

  if (completed === "true") {
    res.json(todos.filter((todo) => todo.completed));
  } else if (completed === "false") {
    res.json(todos.filter((todo) => !todo.completed));
  } else {
    res.status(400).json({
      error:
        "Invalid query parameter. Use 'completed=true' or 'completed=false'",
    });
  }
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: nextTodoId++,
    title: req.body.title || "New Todo",
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const todoId = Number(req.params.id);
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    todos.splice(index, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.patch("/todos/:id", (req, res) => {
  const todoId = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  res.status(200).json(todo);
});

// Running app
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
