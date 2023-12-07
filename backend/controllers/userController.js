const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");

const createUser = async (username, email) => {
  return new Promise((resolve, reject) => {
    const currentDate = new Date().toISOString();
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject("Password hashing error");
      }
      db.run(
        "INSERT INTO users (username, email, hashed_password, dateCreated) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, currentDate],
        (err) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  });
};

module.exports = { createUser };
