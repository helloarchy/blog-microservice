const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// Middleware
const app = express();
app.use(bodyParser.json());

// Data
const events = []

// Catch and distribute events
app.post("/events", (req, res) => {

    // Store
    const event = req.body;
    events.push(event)

    // Emit
    axios
        .post("http://posts-srv:4000/events", event)
        .catch((e) => console.log(`Error posting event to Posts: ${e.message}`));
   axios
        .post("http://comments-srv:4001/events", event)
        .catch((e) => console.log(`Error posting event to Comments: ${e.message}`));
    axios
        .post("http://query-srv:4002/events", event)
        .catch((e) => console.log(`Error posting event to Query: ${e.message}`));
    axios
        .post("http://moderation-srv:4003/events", event)
        .catch((e) => console.log(`Error posting event to Moderation: ${e.message}`));

    res.send({status: "OK"});
});

// Get all events
app.get("/events", ((req, res) => {
    res.send(events);
}))

app.listen(4005, () => {
    console.log("Listening on port 4005");
});
