const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

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
app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comments = commentsByPostId[commentId] || [] // Might be undefined
    const comment = {
        id: commentId,
        content
    }

    comments.push(comment)
    commentsByPostId[req.params.id] = comments

    // Send back the whole array of comments on the post
    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log("Listening on port 4001");
});
