import { randomBytes } from "crypto";
import express from "express";
import cors from "cors";
import axios from "axios";
console.clear();
const app = express();
const PORT = 4001;
const commentsByPostId = {};

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// @desc GET :: test
app.get("/", (req, res) => {
  res.send({ message: "hi from COMMENT server" });
});

// Route::get('/posts/{id}/comments')
// @desc GET :: all Comments
app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  // $request

  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { id: postId } = req.params;

  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];

  comments.push({
    id: commentId,
    content,
  });
  commentsByPostId[postId] = comments;
  //end creating comment
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId,
    },
  });

  res.status(201).send(commentsByPostId);
});

app.post("/events", (req, res) => {
  console.log("Event for", req.body.type);
  res.send({});
});

app.listen(PORT, () => {
  console.log("COMMENTS listen on " + PORT);
});
