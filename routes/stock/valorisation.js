var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var product = require('./../../models/product')
var emptyObject = {
    type1: [],
    names: [],
    unit: [],
    genres: [],
    quantity : [],
    quantityLimit: []
}
router.get('/', authenticate, (req, res) => {
    product.find().distinct('type1').then((result) => {
        if (!result || result.length === 0) {
            res.render('stock/valorisation', emptyObject)
        } else {
            product.find({'type1': result[0]}).distinct('name').then((names) => {
                if (!names || names.length === 0) {
                    res.render('stock/valorisation', emptyObject)
                } else {
                    product.find({'name': names[0]}).distinct('unit').then((unit) => {
                        if (!unit || unit.length === 0) {
                            res.render('stock/valorisation', emptyObject)
                        } else {
                            product.find({'type1': result[0]}).distinct('genre').then((genres) => {
                                if (!genres || genres.length === 0) {
                                    res.render('stock/valorisation', emptyObject)
                                } else {
                                    product.find({
                                        'type1': result[0],
                                        'name': names[0],
                                        'unit': unit[0],
                                        'genre': genres[0]
                                    }).then(
                                        (findResult)=>{
                                            console.log("find product : ", findResult[0]._id)
                                            res.render('stock/valorisation', {
                                                productID: findResult[0]._id,
                                                type1: result,
                                                names: names,
                                                unit: unit,
                                                genres: genres
                                            })
                                        }
                                    ).catch(
                                        (error)=>{
                                            console.log("error find product in valorisation : ", error)
                                        }
                                    )
                                    
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