'use strict';
// const router = require('express').Router();
//
// router.get('/', (req,res,next) => {
//     res.render('login',{
//         pageTitle : 'Tee Kay\'s'
//     });
// });
//
// router.get('/info', (req,res,next)=>{
//     res.send('Test page');
// });
require('./auth')();

// create an IO server instanceof

let ioServer = app => {
    app.locals.chatrooms = [];
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    io.use((socket,next) => {
        require('./session')(socket.request, {}, next);
    })
    require('./socket')(io, app);
    return server;
}

module.exports = {
    router : require('./routes')(),
    session : require('./session'),
    ioServer
}
