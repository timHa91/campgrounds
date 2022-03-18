//Wenn ich node index.js run dann werden die seeds in die DB eingespielt
const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27018/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection.error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Function um einen random Eintrag aus einem Array zu bekommen
//Als Argument ein Array und gibt den Eintrag zurück
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    //Löscht die kompletten campgrounds Einträge
    await Campground.deleteMany({});

    for (let i = 0; i < 50; i++) {
        //random1000 = 1000 verschieden Citties in dem cities.js array
        //Wählt als eine zufällige nummer zwischen 0 und 999
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        //Erstellt neuen campground mit location title, image, etc: 
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas repudiandae delectus nihil, molestias, iure placeat porro tempore dolorum saepe ex. Blanditiis, libero? Animi, qui perspiciatis rerum tenetur est ratione.',
            price
        })
        await camp.save();
    }
}

//Promise: Callback-Funktionen, die in .then() angehängt werden, 
//werden nach dem Ende der asynchronen Operation aufgerufen.
seedDB().then(() => {
    mongoose.connection.close()
});
