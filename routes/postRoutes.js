const express = require("express");
const { getPostsByUserId } = require("../controllers/postController.js");

const router = express.Router();

router.get("/posts", async (req, res) => {
  const userId = req.user.id;

  try {
    const blogPosts = await getPostsByUserId(userId);
    res.status(200).json({ blogPosts });
    res.send("testing");
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog posts", error });
  }
});

module.exports = router;
