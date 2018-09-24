var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var Equipment = require('./../../models/equipment')


router.get('/',authenticate, (req , res) => {

    Equipment.find().distinct('salleName').then((salleNames)=>{
        res.render('sales/addSalle', {
            salleNames: salleNames,
        })
    })
})

module.exports = router