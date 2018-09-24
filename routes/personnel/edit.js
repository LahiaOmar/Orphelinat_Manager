var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')


router.post('/', authenticate, (req, res) => {
    var model = require('./../models/' + req.body.mod)
    model.find({"_id": req.body.id}).then((data) => {
        if (!data || data.length === 0) {
            res.header(401).send()
        } else {
            res.render(req.body.fich + '/edit', {data: data})
        }
    })
})

module.exports = router