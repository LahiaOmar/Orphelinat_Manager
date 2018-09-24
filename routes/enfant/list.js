var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')
var Kid = require('./../../models/kid')


router.get('/', authenticate, (req, res) => {
    console.log(" get enfant/list")
    var choice = ['جميع الاطفال', 'الوفيات', 'الكفالات']
    Kid.find().then((kids) => {
        res.render('enfant/list', {kids: kids, selected : 0, choice : choice})
    })
})

module.exports = router