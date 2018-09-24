var express = require('express');
var router = express.Router();
var User = require('./../../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.cookies.user===undefined || req.cookies.user === "" )
        res.render('users/login');
    else{
        var token = req.cookies.user
        User.findByToken(token).then((user) => {
            if (!user) {
                return Promise.reject()
            }
            req.user = user
            res.redirect('/');
            next()
        }).catch((e) => {
            res.render('users/login')
        })
    }

});
module.exports = router;