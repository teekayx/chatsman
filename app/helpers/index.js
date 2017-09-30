'use strict'

const router = require('express').Router();
const db = require('../db');

let _registerRoutes = (routes, method) => {
    for(let key in routes){
        if(typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)){
            _registerRoutes(routes[key], key);
        }else{
            //register the routes
            if(method === 'get'){
                router.get(key,routes[key]);
            }else if(method === 'post'){
                router.post(key,routes[key]);
            }else{
                router.use(routes[key]);
            }
        }
    }
}
let findOne = profileID => {
    return db.userModel.findOne({
        "profileId" :  profileID
    });
}

let createNewUser = profile => {
    return new Promise((resolve,reject) => {
        let newUser = new db.userModel({
            profileId : profile.id,
            fullName : profile.displayName,
            profilePic : profile.photos[0].value || ''
        });

        newUser.save(error => {
            if(error) {
                reject(error);
            } else {
                resolve(newUser);
            }
        })
    });
}
let route = routes => {
    _registerRoutes(routes);
    return router;
}

module.exports = {
    route,
    findOne,
    createNewUser
}
