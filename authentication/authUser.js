const jwt = require("jsonwebtoken");

const secretKey = "gokstadakademiet";

const authUser = (secretKey) => (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access token"];

    if (!token) {
      return res.status(401).json({ message: "Authorization token not found" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token not valid" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { authUser, secretKey };
