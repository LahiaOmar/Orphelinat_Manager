var express = require('express')
var router = express.Router();
var _ = require('lodash')
var product = require('./../../models/product')
router.post('/', (req, res) => {

    var model = require('./../../models/' + req.body.mod + '.js')
    var data = _.pick(req.body, model.getFields())
    var id = req.body.id
    console.log("id = " , id)
    var back = []
    
    back['employee'] = 'personnel/list'
    back['spent'] = 'finance/addSpent'
    back['income'] = 'finance/addIncome'
    back['salary'] = 'finance/addSalair'
    back['kid'] = '/enfant/list'
    back['benificiaire'] = 'enfant/listBenificiaire'

    if (req.body.mod === 'equipment') {
        if (req.body.genre === 'إضافة') {
            model.update({"salleName": data.salleName, "name": data.name}, {
                $inc: {
                    quantity: Number.parseInt(data.quantity)
                }
            }).then((result) => {
                if (!result) {
                    res.status(401).send()
                } else {
                    res.redirect('/sales/equipements')
                }
            }, (e) => {
                console.log(e)
                res.status(401).send()
            })
        }
        else {
            model.update({"salleName": data.salleName, "name": data.name}, {
                $inc: {
                    quantity: -Number.parseInt(data.quantity)
                },
                $set:{"note" : data.note}
            }).then((result) => {
                if (!result) {
                    res.status(401).send()
                } else {
                    res.redirect('/sales/equipements')
                }
            }, (e) => {
                res.status(401).send()
            })
        }
    }
    else if(req.body.mod === "track"){
        if(req.body.lastId == req.body.productID){
            console.log("same IDs")
            // same product in tracks
            console.log("body.quantity : ", req.body.quantity)
            console.log("quantity : ", req.body.lastQuantity)
            if(req.body.quantity != req.body.lastQuantity){
                console.log("save track data : ", data)
                var valueOfUpdate
                if(req.body.type == 'outcome'){
                    console.log("type " + req.body.type)
                    valueOfUpdate = ( data.quantity - data.lastQuantity ) * -1
                }
                else{
                    console.log("type " + req.body.type)
                    valueOfUpdate = ( data.quantity - data.lastQuantity ) 
                }
                console.log("valurofUpdate : ", valueOfUpdate)
                product.update({"_id": data.productID},{
                    $inc:{
                        'quantity' : valueOfUpdate
                    },
                }).then(
                    (updateResult)=>{
                        console.log(" update quantity of product")
                        model.update({"_id": id}, data).then(
                            (updateTrack)=>{
                                model.update({"_id": id}, data).then((result) => {
                                    if (!result) {
                                        res.status(401).send()
                                    } else {
                                        res.redirect('stock/' + req.body.type + "Track")
                                    }
                                })
                            }
                        ).catch(
                            (error)=>{
                                console.log("error update track : ", error)
                                res.status(401).send()
                            }
                        )
                    }
                ).catch(
                    (error)=>{
                        console.log("error update track value/id product : ", error)
                    }
                )        
            }
            else{
                console.log("no change !!")
                res.redirect('stock/' + req.body.type + "Track")
            }
        }else{
            // update other product for this track
            // lastproduct get lastQuantity
            // new product <-- track.quantity
            console.log("data of track edit : ", data)
            var updateValue 
            if(req.body.type == "outcome"){
                updateValue = req.body.quantity * -1
            }else{
                // income
                updateValue = req.body.quantity 
            }
            product.find({'_id': req.body.lastId}).then(
                (findResult)=>{
                    product.update({'_id': req.body.lastId},{
                        $set:{
                            quantity : findResult[0].lastQuantity // updae last product with lastQuantity
                        }
                    }).then(
                        (resultUpdate)=>{
                            product.update({'_id':req.body.productID},{
                                $inc:{
                                    quantity : updateValue
                                }
                            }).then(
                                (updateProduct)=>{
                                    model.update({"_id": id}, data).then((result) => {
                                        if (!result) {
                                            res.status(401).send()
                                        } else {
                                            res.redirect('stock/' + req.body.type + "Track")
                                        }
                                    })
                                }
                            )
                        }
                    )
                }
            ).catch(
                (error)=>{
                    console.log("error find product for edit track : ", error)
                }
            )
            
        }
        
    }else {
        model.update({"_id": id}, data).then((result) => {
            if (!result) {
                res.status(401).send()
            } else {
                res.redirect(back[req.body.mod])
            }
        })
    }

})


module.exports = router
