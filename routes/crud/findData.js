var express = require('express');
var router = express.Router();
var Product = require('./../../models/product')
var emptyData = {
    type1: [],
    names: [],
    unit: [],
    genre: [],
    quantity : [],
    quantityLimit: []
}
router.post('/', function (req, res, next) {
    var data = req.body.data
    var type = req.body.type
    if (req.body.mod !== undefined) {
        var model = require('./../../models/' + req.body.mod + '.js')
        model.find({'salleName': req.body.id}).then((result) => {
            if (!result || result.length === 0) {
                res.status(401).send()
            }
            res.send({
                names: result
            })
        })
    }
    else {
        if (type === 'type1') {
            console.log("data type1 : ", data)
            Product.find({
                'type1': data
            }).distinct('name').then((names) => {
                if (!names || names.length === 0) {
                    res.send( emptyData)
                } else {
                    console.log('names : '+ names)
                    Product.find({
                        'name': names[0],
                        'type1': data
                    }).distinct('unit').then((unit) => {
                        if (!unit || unit.length === 0) {
                            res.send(emptyData)
                        } else {
                            console.log('unit : '+ unit)
                            Product.find({
                                'type1': data,
                                'name': names[0],
                                'unit' : unit[0]
                            }).distinct('genre').then((genres) => {
                                if (!genres || genres.length === 0) {
                                    console.log("genre zero")
                                    res.send(emptyData)
                                }
                                else if(genres.length === 1) {
                                    console.log('genres : '+ genres)
                                    Product.find({
                                        'type1': data,
                                        'name': names[0],
                                        'unit': unit[0],
                                        'genre': genres[0]
                                    }).distinct('quantity').then((quantity) => {
                                        if (!quantity || quantity.length === 0) {
                                            res.send(emptyData)
                                        } else {
                                            console.log('quantity : '+ quantity)
                                            Product.find({
                                                'type1': data,
                                                'name': names[0],
                                                'unit': unit[0],
                                                'genre': genres[0],
                                            }).distinct('quantityLimit').then((quantityLimits) => {
                                                if (!quantityLimits || quantityLimits.length === 0) {
                                                    res.send(emptyData)
                                                } else {
                                                    console.log("final +", {
                                                        names: names,
                                                        unit: unit,
                                                        genre: genres[0],
                                                        quantity : quantity,
                                                        quantityLimit: quantityLimits
                                                    })
                                                    Product.find({
                                                        name: names[0],
                                                        unit: unit[0],
                                                        genre: genres[0],
                                                        quantity : quantity[0],
                                                        quantityLimit: quantityLimits[0]
                                                    }).then((obj)=>{
                                                        console.log("obj " + obj)
                                                        res.send( {
                                                            productID: obj[0]._id,
                                                            names: names,
                                                            unit: unit,
                                                            genre: genres[0],
                                                            quantity : quantity,
                                                            quantityLimit: quantityLimits
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                                else if(genres.length === 2) {
                                    console.log('genres : '+ genres)
                                    Product.find({
                                        'type1': data,
                                        'name': names[0],
                                        'unit': unit[0],
                                        'genre': genres[0]
                                    }).distinct('quantity').then((quantity1) => {
                                        if (!quantity1 || quantity1.length === 0) {
                                            res.send( {
                                                type1: [],
                                                names: [],
                                                unit: [],
                                                genres: [],
                                                quantity : [],
                                                quantityLimit: []
                                            })
                                        } else {
                                            Product.find({
                                                'type1': data,
                                                'name': names[0],
                                                'unit': unit[0],
                                                'genre': genres[1]
                                            }).distinct('quantity').then((quantity2) => {
                                                if (!quantity2 || quantity2.length === 0) {
                                                    res.send( {
                                                        type1: [],
                                                        names: [],
                                                        unit: [],
                                                        genres: [],
                                                        quantity : [],
                                                        quantityLimit: []
                                                    })
                                                } else {
                                                    var q, g
                                                    if(quantity2 > quantity1){
                                                        q = quantity2
                                                        g = genres[1]
                                                    } else {
                                                        q = quantity1
                                                        g = genres[0]
                                                    }
                                                    console.log('quantity : '+ quantity1)
                                                    Product.find({
                                                        'type1': data,
                                                        'name': names[0],
                                                        'unit': unit[0],
                                                        'genre': g,
                                                        'quantity': q
                                                    }).distinct('quantityLimit').then((quantityLimits) => {
                                                        if (!quantityLimits || quantityLimits.length === 0) {
                                                            res.send( {
                                                                type1: [],
                                                                names: [],
                                                                unit: [],
                                                                genre: [],
                                                                quantity : [],
                                                                quantityLimit: []
                                                            })
                                                        } else {
                                                            res.send( {
                                                                names: names,
                                                                unit: unit,
                                                                genre: [g],
                                                                quantity : [q],
                                                                quantityLimit: quantityLimits
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
                }
            })
        }
        else if (type === 'name') {
            Product.find({
                'type1': req.body.type1,
                'name': data
            }).distinct('unit').then((unit) => {
                if (!unit || unit.length === 0) {
                    res.send( {
                        unit: [],
                        genre: [],
                        quantity : [],
                        quantityLimit: []
                    })
                } else {
                    console.log('unit : '+ unit)
                    Product.find({
                        'type1': req.body.type1,
                        'name': data,
                        'unit' : unit[0]
                    }).distinct('genre').then((genres) => {
                        if (!genres || genres.length === 0) {
                            res.send( {
                                type1: [],
                                names: [],
                                unit: [],
                                genre: [],
                                quantity : [],
                                quantityLimit: []
                            })
                        }
                        else if(genres.length === 1) {
                            console.log('genres : '+ genres)
                            Product.find({
                                'type1': req.body.type1,
                                'name': data,
                                'unit': unit[0],
                                'genre': genres[0]
                            }).distinct('quantity').then((quantity) => {
                                if (!quantity || quantity.length === 0) {
                                    res.send( {
                                        unit: [],
                                        genre: [],
                                        quantity : [],
                                        quantityLimit: []
                                    })
                                } else {
                                    console.log('quantity : '+ quantity)
                                    Product.find({
                                        'type1': req.body.type1,
                                        'name': data,
                                        'unit': unit[0],
                                        'genre': genres[0],
                                    }).distinct('quantityLimit').then((quantityLimits) => {
                                        if (!quantityLimits || quantityLimits.length === 0) {
                                            res.send( {
                                                unit: [],
                                                genre: [],
                                                quantity : [],
                                                quantityLimit: []
                                            })
                                        } else {
                                            res.send( {
                                                unit: unit,
                                                genre: genres[0],
                                                quantity : quantity,
                                                quantityLimit: quantityLimits
                                            })
                                        }
                                    })
                                }
                            })
                        }
                        else if(genres.length === 2) {
                            console.log('genres : '+ genres)
                            Product.find({
                                'type1': req.body.type1,
                                'name': data,
                                'unit': unit[0],
                                'genre': genres[0]
                            }).distinct('quantity').then((quantity1) => {
                                if (!quantity1 || quantity1.length === 0) {
                                    res.send( {
                                        unit: [],
                                        genres: [],
                                        quantity : [],
                                        quantityLimit: []
                                    })
                                } else {
                                    Product.find({
                                        'type1': req.body.type1,
                                        'name': data,
                                        'unit': unit[0],
                                        'genre': genres[1]
                                    }).distinct('quantity').then((quantity2) => {
                                        if (!quantity2 || quantity2.length === 0) {
                                            res.send( {
                                                unit: [],
                                                genres: [],
                                                quantity : [],
                                                quantityLimit: []
                                            })
                                        } else {
                                            var q, g
                                            if(quantity2 > quantity1){
                                                q = quantity2
                                                g = genres[1]
                                            } else {
                                                q = quantity1
                                                g = genres[0]
                                            }
                                            console.log('quantity : '+ quantity1)
                                            Product.find({
                                                'type1': req.body.type1,
                                                'name': data,
                                                'unit': unit[0],
                                                'genre': g,
                                                'quantity': q
                                            }).distinct('quantityLimit').then((quantityLimits) => {
                                                if (!quantityLimits || quantityLimits.length === 0) {
                                                    res.send( {
                                                        unit: [],
                                                        genre: [],
                                                        quantity : [],
                                                        quantityLimit: []
                                                    })
                                                } else {
                                                    res.send( {
                                                        unit: unit,
                                                        genre: [g],
                                                        quantity : [q],
                                                        quantityLimit: quantityLimits
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
        }

    }
});

module.exports = router;