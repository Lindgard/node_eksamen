const express = require("express");
const {
  createUser,
  loginUser,
  loginWithAuth,
  logoutUser,
} = require("../controllers/userController.js");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userId = await createUser(username, email, password);
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const userToken = await loginUser(usernameOrEmail, password);
    res.status(200).json({ token: userToken });
  } catch (error) {
    res.status(401).json({ message: "Login failed", error });
  }
});

router.get("/logout", loginWithAuth, async (req, res) => {
  try {
    await logoutUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error });
  }
});

module.exports = router;
