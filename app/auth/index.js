'use strict';

const passport = require('passport');
const config = require('../config');
const helper = require('../helpers')
const facebookStrategy = require('passport-facebook').Strategy;
const twitterStrategy = require('passport-twitter').Strategy;

module.exports = () => {
    passport.serializeUser((user, done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done) => {
        helper.findById(id)
            .then(user => done(null,user))
            .catch(error => console.log('Deserialize User Error:' + error));
    });

    // verify callback to be passed to passport's facebookStrategy
    let authProcessor = (accessToken, refreshToken, profile, done) => {
        helper.findOne(profile.id)
            .then(result => {
                if(result){
                    done(null,result);
                } else {
                    helper.createNewUser(profile)
                        .then(newUser => done(null, newUser))
                        .catch(error => console.log('Create New User Error:' + error));
                }
            });
    }
    passport.use(new facebookStrategy(config.fb, authProcessor));
    passport.use(new twitterStrategy(config.twitter, authProcessor));
}
