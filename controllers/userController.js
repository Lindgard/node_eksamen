const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const loginUser = async (usernameOrEmail, password, secretKey) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [usernameOrEmail, password],
      async (err, user) => {
        if (err) {
          reject("Login error");
        }
        if (!user) {
          reject("User not found");
        } else {
          const isPasswordMatching = await bcrypt.compare(
            password,
            user.hashed_password
          );
          if (isPasswordMatching) {
            const token = jwt.sign(
              {
                userId: user.id,
                username: user.username,
              },
              secretKey,
              { expiresIn: "2h" }
            );
            resolve({ token });
          } else {
            reject("Invalid password");
          }
        }
      }
    );
  });
};

module.exports = { createUser, loginUser };
