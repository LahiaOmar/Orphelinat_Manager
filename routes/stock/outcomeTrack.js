var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var track = require('./../../models/track')



router.get('/',authenticate,(req , res)=>{
    var today = new Date()
    var month = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "اكتوبر", "نونبر", "دجنبر"]
    var nb = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    console.log(today.getDate())
    track.find({
        'time.year' : today.getFullYear(),
        'time.month' : today.getMonth(),
        'time.day' : today.getDate(),
        'type' : 'outcome'
    }).then((result)=> {
        console.log("tracks === ", result )
        if (!result || result.length === 0) {
            track.find().distinct('time.year').then((years) => {
                res.render('stock/outcomeTrack', {
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
                console.log("years ==== ", years)
                res.render('stock/outcomeTrack', {
                    found: true,
                    years: years,
                    selected: today.getFullYear(),
                    selectedMonth: today.getMonth(),
                    month: month,
                    result: result,
                    days: nb,
                    selectedDay:today.getDate()
                })
            })

        }
    })
})

module.exports = router