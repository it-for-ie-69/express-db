import express from "express";

//Intializing the express app
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Running app
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Running app with error handling for port in use
// const PORT = 3000;
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// server.on("error", (err: NodeJS.ErrnoException) => {
//   if (err.code === "EADDRINUSE") {
//     console.error(
//       `Port ${PORT} is already in use. Stop the other process or use a different port.`,
//     );
//     process.exit(1);
//   }
//   throw err;
// });
