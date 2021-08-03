const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

// set up middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// Get all posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

// Create a post
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  // Send event of creation
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

// Receive any events
app.post("/events", (req, res) => {
  console.log(`Received event ${req.body.type}`, req.body);

  res.send({});
});

app.listen(4000, () => {
  console.log("Version v0.0.9")
  console.log("Listening on port 4000");
});
