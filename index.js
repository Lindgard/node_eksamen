import { express } from "express";
import cors from "cors";
import { sqlite3 } from "sqlite3";

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

let db = new sqlite3.Database("./database.db", (error) => {
  //database with errorhandling
});

//endpoint for creating users
app.post("/register", (req, res) => {
  // CREATE USER
});

// login user endpoint
app.post("/login", (req, res) => {
  //login
});

// logout endpoint
app.post("/logout", (req, res) => {
  //logout user
});

// get all blogposts including username from users
app.get("/posts", (req, res) => {
  //alle posts for bruker
});

// get post by ID
app.get("/posts/:id", (req, res) => {
  // get specific post
});

// create a blogpost
app.post("/", (req, res) => {
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
