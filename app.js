const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const exp = require('constants');
const methodOverride = require('method-override');

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

//You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending
//data (in the form of some data object) to the server and you are asking the server to accept or store that data (object),
//which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request 
//Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.
//urlencoded is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//The req object represents the HTTP request and has properties for the request query string, parameters, body, and HTTP headers. 
//The res object represents the HTTP response that an Express app sends when it gets an HTTP request. 
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    //req.body.campground { title: 'hallo', location: 'hallo' }
    const campground = new Campground(req.body.campground);
    await campground.save();
    //campground._id ist die DB Eintrag id
    res.redirect(`/campgrounds/${campground._id}`);
});

// Id muss als letztes stehen sonst wird alles als /id gesehen
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

//app.listen() is the function that starts a port and host, in our case the localhost for the connections to listen 
//to incoming requests from a client. We can define the port number such as 3000.
app.listen(3000, () => {
    console.log("Serving on port 3000");
});
