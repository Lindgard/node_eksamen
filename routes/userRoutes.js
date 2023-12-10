const express = require("express");
const { createUser, loginUser } = require("../controllers/userController.js");
const router = express.Router();

const secretKey = "gokstadakademiet";

router.post("/register", async (req, res) => {
  const { username, email } = req.body;

  try {
    const userId = await createUser(username, email);
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
});

router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const token = await loginUser(usernameOrEmail, password, secretKey);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ message: "Login failed", error });
  }
});

module.exports = router;
