var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')

router.delete('/', authenticate, (req, res) => {
    var model = require('./../../models/' + req.body.mod)
    model.findById(req.body.id).then((doc, err) => {
        if (doc) {
            doc.remove()
            if (req.body.mod === 'employee') {
                res.redirect(303, 'personnel/list')
            }
            else if (req.body.mod === 'kid') {
                res.redirect(303, 'enfant/list')
            }
            else if (req.body.mod === 'user') {
                res.redirect(303, 'users/listUser')
            }
            else if (req.body.mod === 'benificiaire') {
                res.redirect(303, 'enfant/listBenificiaire')
            }
            else if (req.body.mod === 'spent') {
                res.redirect(303, 'finance/depense')
            }
            else if (req.body.mod === 'income') {
                res.redirect(303, 'finance/revenus')
            }
            else if(req.body.mod == 'track'){
                console.log("type = ", req.body.type)
                if(req.body.type == 'income'){
                    res.redirect(303, 'stock/incomeTrack')
                }
                else{
                    res.redirect(303, 'stock/outcomeTrack')
                }
            }
        }
        else {
            res.status(401).send()
        }
    })
})

module.exports = router