var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var Equipment = require('./../../models/equipment')


router.get('/',authenticate,(req , res)=>{
    Equipment.find().distinct('salleName').then((ids)=>{
        if( !ids || ids.length === 0){
            res.render('sales/list', {
                chambers : [],
                ids : [],
                selected : []
            })
        }
        else{
            Equipment.find({"salleName" : ids[0]}).then((chambers)=>{
                if(!chambers || chambers.length === 0){
                    res.render('sales/list', {
                        chambers : [],
                        ids : [],
                        selected : []
                    })
                } else {
                    res.render('sales/list', {
                        chambers : chambers,
                        ids : ids,
                        selected : ids[0]
                    })
                }
            })
        }


    })


})



module.exports = router