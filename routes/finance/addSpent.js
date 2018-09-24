var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')



router.get('/',authenticate,(req , res)=>{
    res.render('finance/addSpent')
})


module.exports = router