const express = require("express");

const { createUser } = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email } = req.body;

  try {
    const userId = await createUser(username, email);
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
});

module.exports = router;
