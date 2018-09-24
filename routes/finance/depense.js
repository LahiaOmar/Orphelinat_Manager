var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')
var Spent = require('./../../models/spent')

router.get('/', authenticate, (req, res) => {
    console.log("spens rout")
    var today = new Date()
    var month = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "اكتوبر", "نونبر", "دجنبر"]
    console.log("depence time ",  today.getFullYear() , today.getMonth()  )
    Spent.find({
        'time.year': today.getFullYear(),
        'time.month': today.getMonth()+1
    }).then((spends) => {
        if (!spends || spends.length === 0) {
            Spent.find().distinct('time.year').then((years) => {
                res.render('finance/depense', {
                    found: false,
                    years: years,
                    selected: today.getFullYear(),
                    selectedMonth: today.getMonth(),
                    month: month
                })
            })
        } else {
            Spent.find().distinct('time.year').then((years) => {
                res.render('finance/depense', {
                    found: true,
                    years: years,
                    selected: today.getFullYear(),
                    selectedMonth: today.getMonth(),
                    month: month,
                    spends: spends
                })
            })

        }
    })


})

module.exports = router