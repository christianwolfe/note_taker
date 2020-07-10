const express = require("express");
const { v1: uuidv1 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//
app.post("/api/notes", (req, res) => {
    const noteObj = req.body;
    noteObj.id = uuidv1();
})

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})