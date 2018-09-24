var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var product = require('./../../models/product')
var emptyObj = {
    productID : '',
    genre : '',
    type1: [],
    names: [],
    unit: [],
    quantity : [],
    quantityLimit: []
}

router.get('/', authenticate, (req, res) => {
    product.find().distinct('type1').then((type1) => {
        if (!type1 || type1.length === 0) {
            console.log('no distinct value')
            res.render('stock/track',emptyObj )
        } else {
            console.log('result first : '+ type1)
            product.find({'type1': type1[0]}).distinct('name').then((names) => {
                if (!names || names.length === 0) {
                    res.render('stock/track', emptyObj)
                }
                else {
                    console.log('names : '+ names)
                    product.find({
                        'name': names[0],
                        'type1': type1[0]
                    }).distinct('unit').then((unit) => {
                        if (!unit || unit.length === 0) {
                            res.render('stock/track', emptyObj)
                        } else {
                            console.log('unit : '+ unit)
                            product.find({
                                'type1': type1[0],
                                'name': names[0],
                                'unit' : unit[0]
                            }).distinct('quantity').then((quantity)=>{
                                if (!quantity || quantity.length === 0) {
                                    res.render('stock/track', emptyObj)
                                }
                                else{
                                    console.log("quantity ", quantity)
                                    product.find({
                                        'type1': type1[0],
                                        'name': names[0],
                                        'unit' : unit[0],
                                        'quantity': quantity[0]
                                    }).distinct('quantityLimit').then((quantityLimit)=>{
                                        if (!quantityLimit || quantityLimit.length === 0) {
                                            res.render('stock/track', emptyObj)
                                        }
                                        else{
                                            var id
                                            product.find({
                                                type1: type1[0],
                                                name: names[0],
                                                unit: unit[0],
                                                quantity: quantity[0],
                                                quantityLimit: quantityLimit[0]
                                            }).then((objId)=>{
                                                console.log("obj id == ", objId)
                                                id = objId[0]._id

                                                res.render('stock/track',{
                                                    productID: id,
                                                    genre: objId[0].genre,
                                                    type1: type1,
                                                    names: names,
                                                    unit: unit,
                                                    quantity: quantity,
                                                    quantityLimit: quantityLimit
                                                })
                                            })

                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

module.exports = router