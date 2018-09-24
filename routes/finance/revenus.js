var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var Income = require('./../../models/income')


router.get('/', (req, res) => {
    var today = new Date()
    var month = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "اكتوبر", "نونبر", "دجنبر"]
    console.log(today.getFullYear() + " " + today.getMonth())
    console.log("req.body = ", req.body)
    Income.find({
        'time.year': today.getFullYear(),
        'time.month': today.getMonth()+1
    }).then((incomes) => {
        if (!incomes || incomes.length === 0) {
            console.log("income not found")
            Income.find().distinct('time.year').then((years) => {
                res.render('finance/revenus', {
                    found: false,
                    years: years,
                    selected: today.getFullYear(),
                    selectedMonth: today.getMonth()+1,
                    month: month
                })
            })
        } else {
            Income.find().distinct('time.year').then((years) => {
                res.render('finance/revenus', {
                    found: true,
                    years: years,
                    selected: today.getFullYear(),
                    selectedMonth: today.getMonth()+1,
                    month: month,
                    incomes: incomes
                })
            })

        }
    })
})

module.exports = router