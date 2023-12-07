const sqlite3 = require("sqlite3");

let db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
