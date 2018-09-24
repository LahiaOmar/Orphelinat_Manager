var express = require('express')
var router = express.Router();
var _ = require('lodash')
var equipment = require('./../../models/equipment')
var User = require('./../../models/user')
var authenticate = require('./../middleware/authenticate')


router.post('/',authenticate,  (req, res) => {
    var data = _.pick(req.body, equipment.getFields())
    console.log(JSON.stringify(data))

    for(var i=0; i<data.quantity.length; i++){
        var save = {
            "salleName" : data.salleName,
            "name" : data.name[i],
            "quantity" : data.quantity[i],
            "donor" : data.donor
        }

        console.log(save)
        save.createdBy = req.user.login
        var object = new equipment(save)
        object.save().then((result) => {
            if (!result || result.length === 0) {
                res.status(401).send()
            } else {
                res.redirect('/sales/addSalle')
            }
        }, (e) => {
            console.log(e)
            res.status(401).send()
        })

    }


    /*var id = req.body.chamberId

    var data = _.pick(req.body, equipment.getFields())
    console.log(data)
    data.createdBy = req.user.login
    var object = new equipment(data)
    object.save().then((result) => {
        if (!result || result.length === 0) {
            res.status(401).send()
        } else {
            res.status(200).send()
        }
    }, (e) => {
        console.log(e)
        res.status(401).send()
    })*/

})

module.exports = router
