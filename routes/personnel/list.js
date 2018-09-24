var express = require('express')
var router = express.Router()
var authenticate = require('./../../routes/middleware/authenticate')
var Employee = require('./../../models/employee')


router.get('/',authenticate,(req , res)=>{
    Employee.find().then((employees)=>{
        if(!employees || employees.length === 0 ){
            res.render('personnel/list',{employees: employees})
        } else {
            res.render('personnel/list',{employees: employees})
        }
    })

})

module.exports = router