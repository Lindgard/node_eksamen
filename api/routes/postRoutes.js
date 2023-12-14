const express = require("express");
const {
  showPostsByUser,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postController.js");
const { authUser } = require("../authUser.js");

const router = express.Router();

// route to fetch posts made by user
router.get("/", async (req, res) => {
  try {
    // attempt to retrieve posts
    await showPostsByUser(req, res);
  } catch (error) {
    // error-response if fetching posts fail
    res.status(500).json({ message: "Error getting posts by user", error });
  }
});

// route to create a new post
router.post("/", authUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;

    // attempt to create new post for the authenticated/logged in user
    const result = await createPost(userId, title, content);
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
});

// route to update a specific post
router.put("/:id", authUser, async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    // attempt to update the specified post
    const result = await updatePost(postId, title, content);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
});

// route to delete a specific post
router.delete("/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await deletePost(postId);
    res.status(200).json({ message: result });
  } catch (error) {
    // error-response if post deletion fails
    res.status(500).json({ message: "Error deleting post", error });
  }
});

module.exports = router;
