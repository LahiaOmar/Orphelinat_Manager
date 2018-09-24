var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')
var product = require('./../../models/product')

router.post('/', authenticate, (req, res) => {
    var model = require('./../../models/'+req.body.mod)
    model.find({ "_id" : req.body.id}).then((data) => {
        if (!data || data.length === 0) {
            res.status(401).send()
        } else {
            if(req.body.mod === "benificiaire"){
                res.render(req.body.fich+'/editBenificiaire', {data: data})
            }
            else if(req.body.mod === "spent"){
                res.render(req.body.fich+'/'+req.body.genre, {data: data})
            }
            else if(req.body.mod === "income"){
                res.render(req.body.fich+'/'+req.body.genre, {data: data})
            }
            else if(req.body.mod === "salary"){
                res.render(req.body.fich+'/'+req.body.genre, {data: data})
            }
            else if(req.body.mod === 'track'){
                console.log("edit track " , data)
               product.find().then(
                   (trackResult)=>{
                        console.log("result rack find : ", trackResult.length)
                        res.render(req.body.fich + '/' + req.body.genre , {
                            data : data[0],
                            tracks : trackResult
                        })
                   }
               ).catch(
                   (error)=>{
                        console.log(" erroor in track find ", error)
                   }
               )
            }
            else
                res.render(req.body.fich+'/edit', {data: data})
        }
    })
})

module.exports = router