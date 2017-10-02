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
//search in DB for the ID retrieved from facebook
let findOne = profileID => {
    return db.userModel.findOne({
        "profileId" :  profileID
    });
}

//create a new user and store it in db
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

//promisified version of findByID
let findById = (id) => {
    return new Promise((resolve,reject) => {
        db.userModel.findById(id, (error, user) => {
            if(error){
                reject(error);
            } else {
                resolve(user);
            }
        });
    });
}

//route handler done elegantly
let route = routes => {
    _registerRoutes(routes);
    return router;
}

let isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/');
    }
}
module.exports = {
    route,
    findOne,
    createNewUser,
    findById,
    isAuthenticated
}
