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

module.exports = { getPostsByUserId };
