const express = require("express");
const {
  showPostsByUser,
  createPost,
  deletePost,
} = require("../controllers/postController.js");
const { authUser } = require("../authentication/authUser.js");

const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    await showPostsByUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error getting posts by user", error });
  }
});

router.post("/posts", authUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;

    const result = await createPost(userId, title, content);
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
});

router.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await deletePost(postId);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
});

module.exports = router;
