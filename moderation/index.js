const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// Moderate a given comment
app.post("/events", (req, res) => {
    console.log("Event received", req.body)


})

app.listen(4003, () => {
    console.log("Listening on port 4003")
})