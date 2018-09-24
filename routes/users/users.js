const _ = require('lodash');
const express = require('express');
var router = express.Router();
var User = require('./../../models/user');
var Push = require('push.js')

router.post('/', (req, res) => {
    var body = _.pick(req.body, ['login', 'password','access']);
    console.log(body.access)
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token)=>{
        res.render('users/addUser')
    }).catch((e) => {
        console.log(e)
        res.status(400).send(e);
    })
});


module.exports = router;
