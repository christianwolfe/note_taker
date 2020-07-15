const express = require("express");
const { v1: uuidv1 } = require('uuid');
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})

//routes
//read notes
app.get("/api/notes", (req, res) => {
    const noteBody = JSON.parse(fs.readFileSync("db/db.json"))
    res.json(noteBody)
    console.log(noteBody);
});

//post notes
app.post("/api/notes", (req, res) => {
    const noteBody = JSON.parse(fs.readFileSync("db/db.json"))
    const noteObj = req.body;
    noteObj.id = uuidv1();
    noteBody.push(noteObj);
    fs.writeFileSync("db/db.json", JSON.stringify(noteBody))
    res.json(noteBody);
});

//save new notes to db
app.post("/api/notes", function (req, res) {
    notesdb.push(req.body)
    res.json(true);
});

//delete notes by id
app.delete("/api/notes/:id", function (req, res) {
    //assign JSON parse of readFile to a var
    const noteData = JSON.parse(fs.readFileSync("db/db.json"));
    //filter by id
    const newNotes = noteData.filter(function (noteObj) {
        return noteObj.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
    res.json(newNotes);
});
//routes for HTML files
//get notes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//index
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//404
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});