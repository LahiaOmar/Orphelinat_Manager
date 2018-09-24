var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var user = require('./../../models/user')


router.get('/',authenticate,(req , res)=>{
    user.find({"login" :{ $ne : req.user.login}}).then((user)=>{
        if(!user || user.length === 0 ){
            //res.header(400).send()
            res.render('users/listUser',{user: user})
        } else {
            res.render('users/listUser',{user: user})
        }
    })

})

module.exports = router