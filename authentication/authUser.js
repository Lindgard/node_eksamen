const jwt = require("jsonwebtoken");

const secretKey = "gokstadakademiet";

// middleware for authenticating using jwt tokens
const authUser = (secretKey) => (req, res, next) => {
  try {
    // extracting the token from either body, query or header
    const token =
      req.body.token || req.query.token || req.headers["x-access token"];

    // check if token is missing and give an error message if it is
    if (!token) {
      return res.status(401).json({ message: "Authorization token not found" });
    }

    // verifying with the secretKey on line 3
    jwt.verify(token, secretKey, (err, decoded) => {
      // token verification error check and error response if token is not valid
      if (err) {
        return res.status(401).json({ message: "Token not valid" });
      }
      // attach the decoded user info to the request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    // unexpected errors and responding with a status and message
    return res.status(500).json({ message: "Server error", error });
  }
};

// export the middleware and the secretKey for use in other files
module.exports = { authUser, secretKey };
