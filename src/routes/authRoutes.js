import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// endpoint at /auth/register
router.post("/register", (req, res) => {
  // get username, password
  const { username, password } = req.body;

  //encrypt password
  const hashedPassword = bcrypt.hashSync(password, 8);
  console.log(hashedPassword);

  // add user name and encrypted password to Users table
  try {
    const userSql = `INSERT INTO Users (username, password) VALUES (?, ?)`;
    const insertUser = db.prepare(userSql);
    const result = insertUser.run(username, hashedPassword);

    // users get a default todo entry
    const defaultTodo = `Hello ${username}! Add your first todo!`;

    // long way to get userId?
    // const findUserId = `SELECT id FROM Users WHERE username = (?)`;
    // const userId = db.prepare(findUserId).run(username);
    const userId = result.lastInsertRowid;

    const todoSql = `INSERT INTO todos (user_id, task) VALUES (?, ?)`;
    const todoResult = db.prepare(todoSql).run(userId, defaultTodo);

    // create a user token
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// endpoint at /auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  // try catch whenever interacting with db
  try {
    // get email, and lookup associated password by encrypting what was just entered
    // const lookup = `SELECT * from Users WHERE username = (?)`;
    const user = db
      .prepare(`SELECT * from Users WHERE username = ?`)
      .get(username);
    console.log(user);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    //const userId = lookupResult;
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    //sucessful auth
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token }); // sends token back
    //res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});

export default router;
