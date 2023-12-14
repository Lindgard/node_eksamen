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
// app.use(express.static(path.join(__dirname, "frontend-for-eksamensoppgave")));

app.use("/", userRoutes);
app.use("/posts", authUser, postRoutes);

// // handler for root path
// app.get("/", (req, res) => {
//   res.send("Testing");
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
