const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

// Set up middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Data
const posts = {}

// Process events
const handleEvent = (type, data) => {
    if (type === "PostCreated") {
        // Add post to collection
        const {id, title} = data;
        posts[id] = {
            id,
            title,
            comments: []
        }
    } else if (type === "CommentCreated") {
        // Add comment to post collection
        const {id, content, postId, status} = data;
        const post = posts[postId]
        post.comments.push({
            id,
            content,
            status
        })
    } else if (type === "CommentUpdated") {
        // Add comment to post collection
        const {id, content, postId, status} = data;
        const post = posts[postId]
        const comment = post.comments.find(comment => comment.id === id);

        // Not sure what updated, could be status or content
        comment.status = status;
        comment.content = content;
    }
}

// Get all posts with comments
app.get("/posts", (req, res) => {
    res.send(posts);
})

// Receive events
app.post("/events", (req, res) => {
    const {type, data} = req.body;

    handleEvent(type, data)

    res.send({});
})

app.listen(4002, async () => {
    console.log("Listening on port 4002");

    const res = await axios.get("http://event-bus-srv:4005/events")

    for(let event of res.data) {
        console.log("Processing event:", event.type)
        handleEvent(event.type, event.data)
    }
})