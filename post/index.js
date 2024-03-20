import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";
//clear cmd
console.clear();

//start express app
const app = express();
const PORT = 4000;
const posts = {};

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// @desc GET :: just for test
app.get("/", (req, res) => {
  res.send({ message: "hi from POST server" });
});

// @desc GET :: get all posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

// @desc POST :: create post
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  //end creation of a post
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event for", req.body.type);
  res.send({});
});

app.listen(PORT, () => {
  console.log("POST listen on " + PORT);
});
