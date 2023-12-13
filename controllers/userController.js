const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authUser, secretKey } = require("../authentication/authUser.js");

//array for tokens to be used in logout
const blacklistedTokens = [];

const createUser = async (username, email, password) => {
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

const logoutUser = async (req, res) => {
  const userId = req.user.userId; //access user data from authUser.js
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    if (blacklistedTokens.includes(token)) {
      return res.status(401).json({ message: "Token already invalidated" });
    }
    blacklistedTokens.push(token);
    return res
      .status(200)
      .json({ message: `Logout successful for user ${userId}` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  loginWithAuth: authUser(secretKey), //making use of the authUser middleware I made
};
