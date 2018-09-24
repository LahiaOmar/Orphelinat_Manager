var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var Equipment = require('./../../models/equipment')


router.get('/', authenticate, (req, res) => {
    Equipment.find().distinct('salleName').then((salleNames) => {
        if (!salleNames || salleNames.length === 0) {
            res.render('sales/equipement', {
                salleNames: [],
                names: []
            })
        } else {
            Equipment.find({'salleName': salleNames[0]}).distinct('name').then((names) => {
                if (!names || names.length === 0) {
                    res.render('sales/equipement', {
                        salleNames: salleNames,
                        names: []
                    })
                }
                else{
                    console.log("names ", names)
                    res.render('sales/equipement', {
                        salleNames: salleNames,
                        names: names
                    })
                }

            })


        }
    })

})


module.exports = router