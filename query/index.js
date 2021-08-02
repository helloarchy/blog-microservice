const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Set up middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Get all posts with comments
app.get("/posts", (req, res) => {
    console.log("Get all posts")
})

// Receive events
app.post("/events", (req, res) => {
    console.log("Receive events.")
})

app.listen(4002, () => {
    console.log("Listening on port 4002");
})