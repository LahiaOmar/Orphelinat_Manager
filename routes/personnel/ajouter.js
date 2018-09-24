var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')

router.get('/',authenticate, (req , res) => {
    res.set('Content-Type', 'text/html');
    res.render('personnel/ajouter',(err, html) => {
        res.send(html)
    })
})

module.exports = router