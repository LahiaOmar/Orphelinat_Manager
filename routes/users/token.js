const _ = require('lodash');
const express = require('express');
var router = express.Router();
var User = require('./../../models/user');
var  authenticate = require('./../middleware/authenticate')

router.delete('/',authenticate,  (req, res) => {
    req.user.removeToken(req.cookies.user).then(()=>{
        res.status(200).send()
    },()=>{
        res.status(400).send()
    })
});


module.exports = router;
