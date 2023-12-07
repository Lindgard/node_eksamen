import db from "../db/dbConfig.js";

export const createUser = async (username, email) => {
  return new Promise((resolve, reject) => {
    const currentDate = new Date().toISOString();
    db.run(
      "INSERT INTO users (username, email, dateCreated) VALUES (?, ?, ?)",
      [username, email, currentDate],
      (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};
