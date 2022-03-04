const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

//When you call mongoose.model() on a schema, Mongoose compiles a model for you.
//The first argument is the singular name of the collection your model is for. 
//Mongoose automatically looks for the plural, lowercased version of your model name. 
//Thus, for the model Campground is for the campgrounds collection in the database.
module.exports = mongoose.model('Campground', campgroundSchema)