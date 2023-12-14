const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./database.db");

// creating tables for database if they do not exist
db.serialize(() => {
  // creeating the 'users' table
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each user
    username TEXT NOT NULL, -- User's username
    email TEXT NOT NULL UNIQUE, -- User's email that has to be unique
    hashed_password TEXT NOT NULL, -- User's hashed password
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP -- Date for when the user record was created
    )
  `);

  // creating the 'posts' table with a foreign key that references 'users' table above
  db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each post
    title TEXT NOT NULL, -- Title of the post
    content TEXT NOT NULL, -- Content/body of the post
    user_id INTEGER NOT NULL, -- ID of the user creating the post
    date_posted DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date when the post was created
    date_updated DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date when the post was last updated
    FOREIGN KEY (user_id) REFERENCES users(id) -- Establishing a foreign key relationship with 'users' table
  )
  `);
});

module.exports = db;
