'use strict';

const session = require('express-session');
const mongostore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db');

if(process.env.NODE_ENV === 'production'){
    module.exports = session({
        secret : config.sessionSecret,
        resave : false,
        saveUninitialized : false,
        store : new mongostore({
            mongooseConnection : db.mongoose.connection
        })
    });
} else {
    module.exports = session({
        secret : config.sessionSecret,
        resave : false,
        saveUninitialized : true
    });
}
