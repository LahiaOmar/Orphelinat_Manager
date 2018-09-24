
var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var _ = require('lodash')
const Kid = require('./../../models/kid')



router.post( '/',authenticate , function (req , res){
    var obj = _.pick(req.body, ['id', 'checkbox', 'date', 'hidden'])
    Kid.find({'_id': obj.id}).then((kid)=>{
        if(!kid || kid.length === 0){

        }
        else {
            for(var i = 0 ; i<obj.hidden.length; i++){
                if(obj.checkbox[i] === 'yes'){
                    kid[0].addVacc(i, obj.date[i])
                }
            }
            res.redirect('/enfant/list')
        }
    })

})

module.exports = router