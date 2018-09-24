var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var Product = require('./../../models/product')

router.get('/', authenticate, (req, res) => {

    Product.find().distinct('type1').then((types)=>{
        if(!types || types.length === 0){
            res.render('stock/products',{
                types: [],
                found: false,
                selected: 0,
                selectedGenre:"تبرعات"
            })
        } else {
            console.log("types here : ",types)
            Product.find({"type1": types[0], "genre" : "تبرعات"}).then((result)=>{
                console.log("not found taba3ou")
                if(!result || result.length === 0 ){
                    Product.find({"type1" : types[0], "genre": "مشتريات"}).then((result)=>{
                        if(!result || result.length === 0 ){
                            res.render('stock/products',{
                                types: [],
                                found: false,
                                selected: 0,
                                selectedGenre:"تبرعات"
                            })
                        }
                        else{
                            res.render('stock/products',{
                                types: types,
                                result: result,
                                found: true,
                                selected: 0,
                                selectedGenre: result[0].genre
                            })
                        }
                    })
                }
                else {
                    console.log("found")
                    res.render('stock/products', {
                        types: types,
                        result : result,
                        selectedGenre: "تبرعات",
                        selected: 0,
                        found : true
                    })

                }

            })


        }
    })

})


module.exports = router