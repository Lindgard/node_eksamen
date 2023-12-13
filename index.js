const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const { authUser } = require("./authentication/authUser.js");

const app = express();
const port = 3000;
// const secretKey = "gokstadakademiet"; MOVED INTO AUTHENTICATION/AUTHUSER.JS

const corsOptions = {
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("frontend-for-eksamensoppgave"));

//endpoint for creating users handled in userController and userRoutes
app.post("/register", userRoutes);

// login user endpoint handled in userController and userRoutes
app.post("/login", userRoutes);

// logout endpoint
app.get("/logout", userRoutes);

/* get all blogposts including username from users 
handled in postController and postRoutes */
app.get("/posts", authUser, postRoutes);

// get post by ID
app.get("/posts/:id", postRoutes);

// create a blogpost logic placed in postController and postRoutes
app.post("/posts", postRoutes);

// update a blogpost
app.put("/posts/:id", authUser, postRoutes);

// delete endpoint
app.delete("/posts/:id", postRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
