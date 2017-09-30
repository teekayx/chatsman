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

module.exports = {
    router : require('./routes')(),
    session : require('./session')
}
