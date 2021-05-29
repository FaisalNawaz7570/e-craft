const express = require("express");
const mongoose = require('mongoose');
const mongoDBPassword = "FBQEqyEtMVhIELfk"

mongoose.connect('mongodb+srv://Faisalnawaz:FBQEqyEtMVhIELfk@cluster0.jyfng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then((con) => {
    console.log("connected to mongoDb");
}); 

const app = express();

app.listen(8000, () => {
    console.log("server running on port 8000")
})