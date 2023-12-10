const jwt = require("jsonwebtoken");

const authUser = (secretKey) => (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token not valid" });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = authUser;
