const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
const bodyparser = require("body-parser");

// database connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/contactDance", { useNewUrlParser: true });

//Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

// Express Specific configuration
app.use("/static", express.static("static"));  // for serving static file
app.use(express.urlencoded());

// PUG Specific Configuration
app.set("view engine", "pug");  // Set the template engine as pug
app.set("views", path.join(__dirname, "views"));  // Set the views directory


// ENDpoints
app.get("/", (req, res) => {
    const param = {};
    res.status(200).render("home.pug", param);
});

app.get("/contact", (req, res) => {
    const param = {};
    res.status(200).render("contact.pug", param);
});

// Save to the database
app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    
});


// Server Run
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});