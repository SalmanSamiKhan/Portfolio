const express = require("express");
const path = require("path");
const app = express();
const port = 80;

// Express Config
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

//Mongoose
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactdb');
// { useNewUrlParser: true });

const contactSchema = new mongoose.Schema({
    name: String,
    email:  String,
    sub: String,
    msg: String
});

//Compiling schema into model
const Contact = mongoose.model('Contact', contactSchema);


//home
app.get("/", (req, res) => {
    // const params = {}//'message': 'This is code academy'
    res.sendFile(__dirname + '/views/index.html'); 
});

// Post method
app.post('/contact', (req, res) => {
    const myData = Contact(req.body);
    myData.save().then(() => {
        res.send("Item saved in the db");
    }).catch(() => {
        res.send("Item not saved in db");
    })
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The app started successfully using port ${port}`);
});