const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const authUser = require("./authentication/authUser.js");

const app = express();
const port = 3000;
const secretKey = "gokstadakademiet";

const corsOptions = {
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("frontend-for-eksamensoppgave"));

//endpoint for creating users handled in userController and userRoutes
app.use("/register", userRoutes);

// login user endpoint handled in userController and userRoutes
app.use("/login", userRoutes);

// logout endpoint

/* get all blogposts including username from users 
handled in postController and postRoutes */
app.use("/posts", authUser(secretKey), postRoutes);

// get post by ID

// create a blogpost

// update a blogpost

// delete endpoint

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
