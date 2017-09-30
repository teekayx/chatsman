'use strict';

const passport = require('passport');
const config = require('../config');
const helper = require('../helpers')
const facebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    let authProcessor = (accessToken, refreshToken, profile, done)=>{
        helper.findOne(profile.id)
            .then(result =>{
                if(result){
                    done(null,result);
                } else {
                    helper.createNewUser(profile)
                        .then(newUser => done(null, newUser))
                        .catch(error => console.log('Create New User Error:' + error))
                }
            })
    }
    passport.use(new facebookStrategy(config.fb), authProcessor);
}
