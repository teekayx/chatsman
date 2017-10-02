'use strict';

const helper = require('../helpers');
const passport = require('passport');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req,res,next)=>{
                res.render('login', {
                    pageTitle: 'Login Page'
                });
            },
            '/rooms': [helper.isAuthenticated, (req,res,next) => {
                res.render('rooms', {
                    user :req.user
                });
            }],
            '/chat': [helper.isAuthenticated, (req,res,next)=>{
                res.render('chatroom', {
                    user: req.user
                });
            }],
            '/getsession' : (req,res,next) => {
                res.send("routed through getsession and color in session is "+req.session.favColor);
            },
            '/setsession' : (req,res,next) => {
                req.session.favColor = "blue";
                res.send("Session color set");
            },
            '/auth/facebook' : passport.authenticate('facebook'),
            '/auth/facebook/callback' : passport.authenticate('facebook', {
                successRedirect : '/rooms',
                failureRedirect : '/'
            }),
            '/auth/twitter' : passport.authenticate('twitter'),
            '/auth/twitter/callback' : passport.authenticate('twitter', {
                successRedirect : '/rooms',
                failureRedirect : '/'
            }),
            '/logout' : (req,res,next) => {
                req.logout();
                res.redirect('/');
            }
        },
        'post': {

        },
        'na' : (req,res,next) => {
            res.status(404).sendFile(process.cwd()+ '/views/404.ejs');
        }
    }

    return helper.route(routes);
}
