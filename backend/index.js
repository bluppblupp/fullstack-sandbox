const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = 3001;

app.listen(PORT, () => console.log(`TodoList app is running on ${PORT}!`));

let todoLists = {
  "0000000001": {
    id: "0000000001",
    title: "First List",
    todos: ["First todo of first list"],
  },
  "0000000002": {
    id: "0000000002",
    title: "Second List",
    todos: ["hejsan", "tjenare"],
  },
};

app.get("/retreiveTodos", (req, res) => {
  res.send(todoLists);
  console.log("Hämtade listan innehåller", todoLists);
});
