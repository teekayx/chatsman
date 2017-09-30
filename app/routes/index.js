'use strict';

const helper = require('../helpers');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req,res,next)=>{
                res.render('login', {
                    pageTitle: 'Login Page'
                });
            },
            '/rooms': (req,res,next) => {
                res.render('rooms');
            },
            '/chat': (req,res,next)=>{
                res.render('chatroom');
            },
            '/getsession' : (req,res,next) => {
                res.send("routed through getsession and color in session is "+req.session.favColor);
            },
            '/setsession' : (req,res,next) => {
                req.session.favColor = "blue";
                res.send("Session color set");
            }
        },
        'post': {

        },
        'na' : (req,res,next) => {
            res.status(404).sendFile(process.cwd()+ 'views/404.ejs');
        }
    }

    return helper.route(routes);
}
