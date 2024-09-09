const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));

const readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile("./" + filename, 'utf8', (err, data) => {
            if(err) {
                console.error(err);
                reject("Error!");
            }

            resolve(data.split("\n"));
        });
    });
};

app.get("/", (req, res) => {
    readFile("tasks").then(tasks => {
        res.render("index", {tasks});
    });
});

app.use(express.urlencoded({extended: true}));

app.post("/", (req, res) => {
    console.log("Form sent data", req.body);
    readFile("tasks").then(tasks => {
        tasks.push(req.body.task);

        const data = tasks.join("\n");
        fs.writeFile("./tasks", data, err => {
            if(err) {
                console.error(err);
                return;
            }

            res.redirect("/");
        });
    });
});

app.listen(8080, () => {
    console.log("Server kuulab pordi 8080 peal");
});