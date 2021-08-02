const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// Moderate a given comment
app.post("/events", async (req, res) => {
    console.log("Event received", req.body)

    const {type, data} = req.body;
    const forbidden = "orange"

    if (type === "CommentCreated") {
        // Moderate new comment
        const status = data.content.status.contains(forbidden) ? "rejected" : "approved"

        // Emit event
        await axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            content: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status,
            }
        })
    }
})

app.listen(4003, () => {
    console.log("Listening on port 4003")
})