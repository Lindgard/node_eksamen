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
      "INSTERT INTO posts (title, content, user_id, datePosted) VALUES (?, ?, ?, ?)",
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

module.exports = { showPostsByUser };
