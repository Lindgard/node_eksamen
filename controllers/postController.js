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
    const userId = req.user.id;
    const { title, content } = req.body;

    await createPost(userId, title, content); //use createPost to add a new blogpost to show
    const userPosts = await getPostsByUserId(userId);
    res.status(200).json({ userPosts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts made by the user", error });
  }
};

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
