import express from "express";
import cors from "cors";

const PORT = 8080;
let todos = [
  {
    id: 1,
    text: "Learn React"
  },
  {
    id: 2,
    text: "Learn Node"
  }
];
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/todos", (req, res) => {
  res.json(todos);
})

app.post("/api/todos", (req, res) => {
  setTimeout(() => {
    const body = req.body || {};
    if (body.text === "clear") {
      todos = [];
      res.json([]);
    } else if (body?.text !== "error") {
       const todo = {
        id: todos.length + 1,
        text: body.text ?? ""
      }
      todos.push(todo);
      res.json(todo);
    } else {
      res.status(500).json({ error: "Failed to add todo" });
    }
     
  }, 3000);
})

app.listen(PORT, () => {
  console.log("Listening on port:" + PORT);
})
