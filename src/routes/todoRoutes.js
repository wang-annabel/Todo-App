import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

// get all todos for logged-in user
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId,
    },
  });
  res.json(todos);
});

// create a new todo
router.post("/", async (req, res) => {
  // does it automatically get routed to /todos?
  const { task } = req.body;
  const todo = await prisma.todo.create({
    data: {
      userId: req.userId,
      task: task,
    },
  });
  res.json({ todo });
});

// update a todo
router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  // access query from url like so:
  // const { page } = req.query;

  const updated = await prisma.todo.update({
    where: {
      id: parseInt(id),
      userId: req.userId,
    },
    data: {
      completed: !!completed, // converts completed to a bool
    },
  });
  res.json({ updated });
});

// delete a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await prisma.todo.delete({
    where: {
      id: parseInt(id),
      userId: req.userId,
    },
  });
  res.json({ message: `Deleted task with id ${id}, user_id ${req.userId}` });
});

export default router;
