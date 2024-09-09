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

            resolve(data);
        });
    });
};

const writeFile = (filename, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile("./" + filename, content, (err, data) => {
            if(err) {
                console.error(err);
                reject(false);
            }

            resolve(true)
        })
    });
}

app.get("/", (req, res) => {
    readFile("tasks.json").then(tasks => {
        res.render("index", {tasks: JSON.parse(tasks)});
    });
});

app.use(express.urlencoded({extended: true}));

app.post("/", (req, res) => {
    console.log("Form sent data", req.body);
    readFile("tasks.json").then(tasks => {
        const data = JSON.parse(tasks);
        data.push({
            id: data.length + 1,
            task: req.body.task
        })
        writeFile("tasks.json", JSON.stringify(data));
        res.redirect("/");
    });
});

app.get("/delete-task/:id", (req, res) => {
    readFile("tasks.json").then(tasks => {
        const data = JSON.parse(tasks);

        data.forEach((task, index) => {
            if(task.id == req.params.id) {
                data.splice(index, 1);
            }
        });
        writeFile("tasks.json", JSON.stringify(data));
        res.redirect("/");
    });
});

app.listen(8080, () => {
    console.log("Server kuulab pordi 8080 peal");
});