var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')
var Kid = require('./../../models/kid')


router.post('/', authenticate, (req, res) => {
    var id = req.body.id
    Kid.find({'_id': id}).then((kid) => {
        if (!kid || kid.length === 0) {
            res.status(401).send()
        } else {
            res.render('enfant/vaccination',{
                kid: kid
            })
        }
    })
})

module.exports = router
