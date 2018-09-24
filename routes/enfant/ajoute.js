var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var equipment = require('./../../models/equipment')


router.get( '/',authenticate,function (req , res){
    equipment.find().distinct('salleName').then((salles)=>{
        if(!salles || salles.length === 0){
            res.render('enfant/ajoute',{
                salles: []
            })
        } else {
            res.render('enfant/ajoute',{
                salles : salles
            })
        }
    })

})

module.exports = router