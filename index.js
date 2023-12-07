const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userRoutes = require("./backend/routes/userRoutes.js");
const postRoutes = require("./backend/routes/postRoutes.js");

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

//endpoint for creating users handled in userController and userRoutes
app.use(userRoutes);

// login user endpoint handled in userController and userRoutes
app.use(userRoutes);

// logout endpoint
app.post("/logout", (req, res) => {
  //logout user
});

/* get all blogposts including username from users 
handled in postController and postRoutes */
app.use(postRoutes);

// get post by ID
app.get("/posts/:id", (req, res) => {
  // get specific post
});

// create a blogpost
app.post("/posts", (req, res) => {
  // blogposts
});

// update a blogpost
app.put("/posts/:id", (req, res) => {
  /* updating blogposts by swapping out entire old post
   with new */
});

// delete endpoint
app.delete("/posts/:id", (req, res) => {
  // delete blogpost
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
