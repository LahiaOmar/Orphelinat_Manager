var express = require('express');
var router = express.Router();
var authenticate = require('./../routes/middleware/authenticate')
var equivalence = require('./../models/equivalence')

router.get('/', authenticate, function(req, res, next) {
    var today = new Date()
    equivalence.find().distinct('year').then((years) => {
        equivalence.find({'year': today.getFullYear()}).then((data) => {
            if (!data || data.length === 0) {
                var month = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "اكتوبر", "نونبر", "دجنبر"]
                res.render('index', {
                    data: [],
                    month: month,
                    years: [],
                    user: req.user
                })
            } else {
                var month = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "اكتوبر", "نونبر", "دجنبر"]
                res.render('index', {
                    data: data,
                    month: month,
                    years: years,
                    user: req.user
                })
            }
        })

    })
});

module.exports = router;
