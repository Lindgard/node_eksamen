const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const { authUser } = require("./authentication/authUser.js");

const app = express();
const port = 3000;
// const secretKey = "gokstadakademiet"; //MOVED INTO AUTHENTICATION/AUTHUSER.JS

const corsOptions = {
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* using the root path for userRoutes because the routes in that file
has the paths needed, adding the /posts to the postRoutes */
app.use("/", userRoutes);
app.use("/posts", authUser, postRoutes);

// need the express.static to make use of the frontend-folder for testing
app.use(express.static("frontend-for-eksamensoppgave"));

// handler for root path
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend-for-eksamensoppgave/index.html");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
