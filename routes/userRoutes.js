const express = require("express");
const {
  createUser,
  loginUser,
  loginWithAuth,
  logoutUser,
} = require("../controllers/userController.js");
const router = express.Router();

// route to handle user registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // attempt to create a new user with the provided details
    const userId = await createUser(username, email, password);
    // respond with a success message if user was created successfully
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
});

// route to handle login for users
router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // attempt to log in using provided credentials
    const userToken = await loginUser(usernameOrEmail, password);

    /*   
    res.cookie("token", userToken, {
      httpOnly: true,
    }); */

    res.status(200).json({ token: userToken });
  } catch (error) {
    // respond with error if login is unsuccessful
    res.status(401).json({ message: "Login failed", error });
  }
});

// route to handle logout functionality
router.get("/logout", loginWithAuth, async (req, res) => {
  try {
    // attempt to log out the authenticated user
    await logoutUser(req, res);
  } catch (error) {
    // respond with error if logout fails
    res.status(500).json({ message: "Logout failed", error });
  }
});

module.exports = router;
