const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    fs.readFile("./tasks", 'utf8', (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        res.render("index", {tasks: data.split("\n")});
    })
});

app.listen(8080, () => {
    console.log("Server kuulab pordi 8080 peal");
});