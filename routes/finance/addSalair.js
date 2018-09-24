var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')
var employee = require('./../../models/employee')
router.get('/',authenticate, (req , res)=>{

    employee.find().then((employees)=>{
        if(employees.length === 0 || !employees){
            console.log("not found")
            res.render('finance/addSalair',{
                employees: [],
                selected: -1
            })
        }
        else{
            console.log("found")
            res.render('finance/addSalair',{
                employees: employees,
                selected: 0
            })
        }

    })

})


module.exports = router
