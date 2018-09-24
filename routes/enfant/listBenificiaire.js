var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')
var list = require('./../../models/benificiaire')


router.get('/', authenticate, (req, res) => {
    list.find().then((lists) => {
        if (!lists || lists.length === 0) {
            res.render('enfant/listBenificiaire', {lists: lists})
        } else {
            res.render('enfant/listBenificiaire', {lists: lists})
        }
    })
})

module.exports = router