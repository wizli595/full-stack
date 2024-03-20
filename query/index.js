import express from "express";
import cors from "cors";
import axios from "axios";
console.clear();

const app = express();
const PORT = 4002;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  //logic
  handleEvent(type, data);
  res.send({});
});

app.listen(PORT, () => {
  console.log("Query listening on " + PORT);
});
