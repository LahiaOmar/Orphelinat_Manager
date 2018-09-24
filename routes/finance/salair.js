var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var Salary = require('./../../models/salary')


router.get('/',authenticate ,(req , res)=>{
    var today = new Date()
    var month = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "اكتوبر", "نونبر", "دجنبر"]
    console.log("months : ", today.getMonth())
    Salary.find({
        'time.year': today.getFullYear(),
        'time.month': today.getMonth()+1
    }).then((salaries) => {
        if (!salaries || salaries.length === 0) {
            Salary.find().distinct('time.year').then((years) => {
                res.render('finance/salair', {
                    found: false,
                    years: years,
                    selected: today.getFullYear(),
                    selectedMonth: today.getMonth()+1,
                    month: month
                })
            })
        } else {
            Salary.find().distinct('time.year').then((years) => {
                res.render('finance/salair', {
                    found: true,
                    years: years,
                    selected: today.getFullYear(),
                    selectedMonth: today.getMonth()+1,
                    month: month,
                    salaries: salaries
                })
            })

        }
    })
})



module.exports = router