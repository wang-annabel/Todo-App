import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("memory"); // in memory database

// execute
// user table
db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`);

// todo table
db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES Users(id)
    )
`); // in prod dbs: soft_delete BOOLEAN DEFAULT 0, for retrieving temporarily deleted entries

export default db;
