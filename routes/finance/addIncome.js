var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')

router.get('/',authenticate, (req , res)=>{

    res.render('finance/addIncome',(err, html) => {
        res.send(html)
    })
})


module.exports = router