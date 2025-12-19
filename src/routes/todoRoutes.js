import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// get all todos for logged-in user
router.get("/", (req, res) => {
  const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
  const todos = getTodos.all(req.userId);
  res.json(todos);
});

// create a new todo
router.post("/", (req, res) => {
  // does it automatically get routed to /todos?
  const { task } = req.body;
  const insertTodo = db.prepare(
    `INSERT INTO todos (user_id, task) VALUES (?, ?)`
  );
  const result = insertTodo.run(req.userId, task);
  res.json({ id: result.lastInsertRowid, task, completed: 0 });
});

// update a todo
router.put("/:id", (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  // access query from url like so:
  // const { page } = req.query;

  const updatedTodo = db.prepare("UPDATE todos SET completed = ? WHERE id = ?");
  updatedTodo.run(completed, id);
  res.json({ message: "Todo completed" });
});

// delete a todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedTodo = db.prepare(
    "DELETE FROM todos WHERE id = ? AND user_id = ?"
  );
  deletedTodo.run(id, req.userId);
  res.json({ message: `Deleted task with id ${id}, user_id ${req.userId}` });
});

export default router;
