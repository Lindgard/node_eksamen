const db = require("../db/dbConfig.js");

const getPostsByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM posts WHERE userId = ?", [userId], (err, rows) => {
      if (err) {
        reject("Error fetching blog posts");
      }
      resolve(rows);
    });
  });
};

const showPostsByUser = async (req, res) => {
  try {
    const userId = req.user.id; // retrieve user Id from request object
    const { title, content } = req.body;

    await createPost(userId, title, content); //add a new blog post for user
    const userPosts = await getPostsByUserId(userId); // fetch posts made by user
    res.status(200).json({ userPosts }); // respond with user's posts
  } catch (error) {
    // error handling for fetching posts
    res
      .status(500)
      .json({ message: "Error fetching posts made by the user", error });
  }
};

// function for creating new posts
const createPost = async (userId, title, content) => {
  return new Promise((resolve, reject) => {
    const currentDate = new Date().toISOString();
    db.run(
      "INSTERT INTO posts (title, content, user_id, date_posted) VALUES (?, ?, ?, ?)",
      [title, content, userId, currentDate],
      (err) => {
        if (err) {
          reject("Error creating post");
        } else {
          resolve("Post created successfully");
        }
      }
    );
  });
};

// function to update posts by ID
const updatePost = async (postId, title, content) => {
  return new Promise((resolve, reject) => {
    const currentDate = new Date().toISOString();
    db.run(
      "UPDATE posts SET title = ?, content = ?, date_updated = ? WHERE id = ?",
      [title, content, currentDate, postId],
      (err) => {
        if (err) {
          reject("Error updating post");
        } else {
          resolve("Successfully updated post");
        }
      }
    );
  });
};

// function to delete posts based on ID
const deletePost = async (postId) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM posts WHERE id = ?", [postId], (err) => {
      if (err) {
        reject("Error deleting post");
      } else {
        resolve("Post deleted successfully");
      }
    });
  });
};

module.exports = {
  showPostsByUser,
  createPost,
  getPostsByUserId,
  deletePost,
  updatePost,
};
