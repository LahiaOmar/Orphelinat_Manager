var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var track = require('./../../models/track')



router.get('/',authenticate,(req , res)=>{
    var today = new Date()
    var month = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "اكتوبر", "نونبر", "دجنبر"]
    var nb = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    track.find({
        'time.year' : today.getFullYear(),
        'time.month' : today.getMonth(),
        'time.day' : today.getDate(),
        'type' : 'income'
    }).then((result)=> {
        if (!result || result.length === 0) {
            track.find().distinct('time.year').then((years) => {
                res.render('stock/incomeTrack', {
                    found: false,
                    years: years,
                    selected: today.getFullYear(),
                    selectedMonth: today.getMonth(),
                    month: month,
                    days: nb,
                    selectedDay:today.getDate()
                })
            })
        } else {
            track.find().distinct('time.year').then((years) => {
                res.render('stock/incomeTrack', {
                    found: true,
                    years: years,
                    selected: today.getFullYear(),
                    selectedMonth: today.getMonth(),
                    month: month,
                    result: result,
                    days: nb,
                    selectedDay: today.getDate()
                })
            })

        }
    })
})

module.exports = router
