const mongoose = require('./../../bd/mongoose')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
var User = require('./../../models/user')

router.post('/', (req, res) => {
    console.log("log")
    var body = _.pick(req.body, ['login', 'password','newPassword'])

    if(body.newPassword){
        User.findByCredentials(body.login, body.password).then((user) => {
            if(body.newLogin){
                return user.modifyCredentials(body.newPassword).then((user)=>{
                    req.user = user;
                    res.set('Content-Type', 'application/json');
                    res.send(user)
                })
            }
             else {
                return user.modifyPassword(body.newPassword).then((user) => {
                    req.user = user;
                    res.set('Content-Type', 'application/json');
                    res.send(user)
                })
            }
        }).catch((e) => {
            res.status(401).send()
        })
    }
    else {
        console.log("here login")
        User.findByCredentials(body.login, body.password).then((user) => {
            return user.generateAuthToken().then((token) => {
                req.user = user;
                console.log(user)
                res.set('Content-Type', 'application/json');
                res.send(user)
            })
        }).catch((e) => {
            res.status(401).send()
        })
    }
})
module.exports = router