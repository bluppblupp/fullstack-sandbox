const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.use(cors());

const PORT = 3001;

app.listen(PORT, () => console.log(`TodoList app is running on ${PORT}!`));

let todoLists = {
  "0000000001": {
    id: "0000000001",
    title: "First List",
    todos: [{ task: "First todo of first list!", done: false }],
  },
  "0000000002": {
    id: "0000000002",
    title: "Second List",
    todos: [{ task: "First todo of second list!", done: false }],
  },
};

app.get("/retreiveTodoLists", (req, res) => {
  res.send(todoLists);
  console.log("Hämtade listan innehåller", todoLists);
});

app.post("/postTodoLists", (req, res) => {
  const newInput = req.body;
  todoLists = newInput;
  res.sendStatus(201);
  console.log("Postade listan efter send");
  console.log(todoLists);
});
