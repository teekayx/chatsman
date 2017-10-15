'use strict';

const express = require('express');
const app  = express();
const chatsMan= require('./app');
const passport = require('passport');
const path = require('path');

app.set('port',process.env.PORT || 3000);
app.use(express.static('public'));
//app.set('views', path.join(__dirname,'views')); // reduntant as by default it looks for a 'views' folder */
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(chatsMan.session);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', chatsMan.router);

chatsMan.ioServer(app).listen(app.get('port'), () => {
    console.log('chatsman running on port:', app.get('port'));
});
