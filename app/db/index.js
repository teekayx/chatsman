'use strict';

const config = require('../config');
const mongoose = require('mongoose')

mongoose.connect(config.dbURI,{
     useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;
//
// //Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const chatsman = new mongoose.Schema({
    profileId : String,
    fullName : String,
    profilePic : String
});

let userModel = Mongoose.model('chatsman', chatsman);

module.exports = {
    mongoose,
    userModel
}