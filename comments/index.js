const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

// Set up middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// Get all comments for a given post
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment for a give post
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  // Emit event now comment created
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      postId,
      content,
    },
  });

  // Send back all comment on the post
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
