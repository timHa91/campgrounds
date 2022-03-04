const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

//This is the minimum needed to connect the yelp-camp database
mongoose.connect('mongodb://localhost:27017/tim-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express(); // gibt express Object zurück 


app.set('view engine', 'ejs');
//__dirname is an environment variable that tells you the 
//absolute path of the directory containing the currently executing file
// path.join adds both parts together = __dirname path + views
app.set('views', path.join(__dirname, 'views'));

//The req object represents the HTTP request and has properties for the request query string, parameters, body, and HTTP headers. 
//The res object represents the HTTP response that an Express app sends when it gets an HTTP request. 
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({
        title: 'My Backyard',
        description: 'cheap camping!'
    });
    await camp.save();
    res.send(camp);
});

//app.listen() is the function that starts a port and host, in our case the localhost for the connections to listen 
//to incoming requests from a client. We can define the port number such as 3000.
app.listen(3000, () => {
    console.log("Serving on port 3000");
});
