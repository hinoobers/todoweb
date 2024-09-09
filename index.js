const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Test!");
});

app.listen(8080, () => {
    console.log("Server kuulab pordi 8080 peal");
});