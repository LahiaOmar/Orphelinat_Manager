var express = require('express')
var router = express.Router();
var _ = require('lodash')
var Equivalence = require('./../../models/equivalence')
var User = require('./../../models/user')
var authenticate = require('./../../routes/middleware/authenticate')


router.post('/', authenticate, (req, res) => {
    var mod = require('./../../models/' + req.body.mod + '.js')
    var today
    if (req.body.day)
        today = new Date(req.body.day)
    else
        today = new Date();
    var back = []
    back['employee'] = 'personnel/add'
    back['spent'] = 'finance/addSpent'
    back['income'] = 'finance/addIncome'
    back['salary'] = 'finance/addSalair'
    back['kid'] = 'enfant/ajoute'
    back['benificiaire'] = 'enfant/benificiaire'
    back['product'] = 'stock/addProduct'
    if (req.body.type !== null && req.body.type !== undefined && req.body.type === 'outcome')
        back['track'] = 'stock/track'
    else if (req.body.type !== null && req.body.type !== undefined && req.body.type === 'income')
        back['track'] = 'stock/valorisation'

    if (req.body.mod === 'product') {
        var data = _.pick(req.body, mod.getFields())
        data.lastQuantity = data.quantity
        mod.find({
            'type1': data.type1,
            'name': data.name,
            'genre': data.genre
        }).then((result) => {
            if (!result || result.length === 0) {
                data.createdBy = req.user.login
                var object = new mod(data)
                if (req.body.mod === 'kid') {
                    object.initialise()
                }
                object.save().then((result) => {
                    if (!result || result.length === 0) {
                        res.status(401).send()
                    } else {
                        res.redirect(back[req.body.mod])
                    }
                })
            } else {
                res.status(401).send()
            }
        })
    } else {
        if (req.body.mod === 'spent') {
            var year = today.getFullYear()
            Equivalence.find({'year': year}).then((results) => {
                if (!results || results.length === 0) {
                    console.log("year not found ")
                    var object = new Equivalence()
                    object.year = year
                    object.createdBy = req.user.login
                    object.addMonth(today.getMonth()+1, 0, req.body.checkValue)
                    object.save().then((results) => {
                        if (!results) {
                            res.status(401).send()
                        } else {
                            res.status(200).send()
                        }
                    }, (e) => {
                        res.status(401).send()
                    })
                } else {
                    console.log("year found")
                    results[0].modifyMonth(req.user.login, today.getMonth()+1, 0, req.body.checkValue)
                }
            })

        }
        else if (req.body.mod === 'income') {
            console.log("income ")
            var year = today.getFullYear()
            Equivalence.find({'year': year}).then((years) => {
                if (!years || years.length === 0) {
                    var object = new Equivalence({
                        year: year,
                        createdBy: req.user.login
                    })
                    object.addMonth(today.getMonth()+1, req.body.value, 0)
                    object.save().then((results) => {
                        if (!results || results.length === 0) {
                            res.status(401).send()
                        } else {
                            res.status(200).send()
                        }
                    }, (e) => {
                        res.status(401).send()
                    })
                } else {
                    years[0].modifyMonth(req.user.login, today.getMonth(), req.body.value, 0)
                }
            })
        }
        var data = _.pick(req.body, mod.getFields())
        data.createdBy = req.user.login
        var object = new mod(data)
        console.log("data ===>", data)
        if (req.body.mod === 'kid') {
            object.initialise()
        }
        if(req.body.mod == 'spent'){
            var cur = data.day.split('-')
            //data.time.day = cur[2]
            var time = {
                day : parseInt(cur[2]),
                month: parseInt(cur[1]),
                year : parseInt(cur[0])
            }
            data.time = time
        }
        object.save().then((result) => {
            if (!result || result.length === 0) {
                console.log("object save if")
                res.status(401).send()
            } else {

                res.redirect(back[req.body.mod])
            }
        },(e)=>{
            console.log(e)
        } )
    }

})

module.exports = router

