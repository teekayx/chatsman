'use strict';

if(process.env.NODE_ENV === 'production'){
    module.exports = {
        host : process.env.host || "",
        dbURI : process.env.dbURI,
        sessionSecret : process.env.sessionSecret,
        fb: {
            clientID: process.env.fbClientID,
            clientSecret: process.env.fbClientSecret,
            callbackUrl: process.env.host + "/auth/facebook/callback",
            profileFields : ['id', 'displayName', 'photos']
        },
        twitter: {
            consumerKey: process.env.twConsumerKeyfbClientID,
            consumerSecret: process.env.twConsumerSecret,
            callbackUrl: process.env.host + "/auth/twitter/callback",
            profileFields : ['id', 'displayName', 'photos']
        }
    }
} else {
    module.exports = require('./dev.json');
}
