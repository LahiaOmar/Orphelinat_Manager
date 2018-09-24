var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')
var Kid = require('./../../models/kid')

router.post('/',authenticate ,(req , res)=>{
    var day = new Date().getUTCDate()
    var month = new Date().getUTCMonth() + 1;
    var year = new Date().getFullYear();
    console.log(req.body)
    console.log("date : ",day, month, year)
    Kid.find({"_id" : req.body.id}).then((kid) => {
        if (!kid || kid.length === 0) {
            res.status(200).send()
        } else {
            res.render('enfant/jugement', {
                kid: kid,
                day: day,
                month : month,
                year : year
            })
        }
    })

})



module.exports = router
