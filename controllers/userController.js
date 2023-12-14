const db = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authUser, secretKey } = require("../authentication/authUser.js");

//array for blacklisted tokens to be used in logoutUser
const blacklistedTokens = [];

const createUser = async (username, email, password) => {
  return new Promise((resolve, reject) => {
    // generating current date for the user creation timestamp
    const currentDate = new Date().toISOString();
    // password hashing
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject("Password hashing error");
      }
      // placing user details in database
      db.run(
        "INSERT INTO users (username, email, hashed_password, dateCreated) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, currentDate],
        function (err) {
          if (err) {
            reject(err.message);
          } else {
            // resolving with the id of the newly created user
            resolve(this.lastID);
          }
        }
      );
    });
  });
};

// authentication and login functionality
const loginUser = async (usernameOrEmail, password, secretKey) => {
  return new Promise((resolve, reject) => {
    // searching the data base for user with username or email
    db.get(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [usernameOrEmail, usernameOrEmail],
      async (err, user) => {
        if (err) {
          reject("Login error");
        }
        if (!user) {
          // rejecting if the user is not found in the database
          reject("User not found");
        } else {
          // comparing provided password with the stored hashed password
          const isPasswordMatching = await bcrypt.compare(
            password,
            user.hashed_password
          );
          if (isPasswordMatching) {
            // generating a jwt token on successful login
            const token = jwt.sign(
              {
                userId: user.id,
                username: user.username,
              },
              secretKey,
              { expiresIn: "2h" }
            );
            // resolving with the token generated
            resolve({ token });
          } else {
            reject("Invalid password");
          }
        }
      }
    );
  });
};

// user logout functionality
const logoutUser = async (req, res) => {
  const userId = req.user.userId; //access user data from authUser.js
  const token = req.headers.authorization;

  if (!token) {
    // respond with an error if the authorization token is missing
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    if (blacklistedTokens.includes(token)) {
      // respond with an error if the token is in the array for blacklisted tokens
      return res.status(401).json({ message: "Token already invalidated" });
    }
    // adding the token to the blacklist
    blacklistedTokens.push(token);
    // respond to successful logouts with a success message
    return res
      .status(200)
      .json({ message: `Logout successful for user ${userId}` });
  } catch (error) {
    // server error handling and status response
    res.status(500).json({ message: "Server error", error });
  }
};

// exporting for use in other modules/files
module.exports = {
  createUser,
  loginUser,
  logoutUser,
  loginWithAuth: authUser(secretKey), //making use of the authUser middleware I made
};
