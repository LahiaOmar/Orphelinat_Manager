var express = require('express');
var router = express.Router();
var Product = require('./../../models/product')
var _ = require('lodash')
var income = require('./../../models/income')
var spent = require('./../../models/spent')

router.post('/', (req, res, next) => {
    var mod = req.body.mod
    var obj = req.body
    var model = require('./../../models/' + req.body.mod + '.js')
    var today = new Date()
    var sumSpent = Array(13)
    var sumIncome = Array(13)
    sumSpent.fill(0,0,13)
    sumIncome.fill(0,0,13)
    var month = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "اكتوبر", "نونبر", "دجنبر"]
    if (mod === 'equivalence') {
        spent.find({"time.year" : req.body.year}).then(
            (spentResult)=>{
                income.find({"time.year" : req.body.year}).then(
                    (incomeResult)=>{
                        if(spentResult.length !== 0){
                            spentResult.forEach((element)=>{
                                console.log("loop ", element.checkValue)
                                sumSpent[ element.time.month ] += element.checkValue 
                            })
                        }
                        console.log("sumSpent : ", sumSpent)
                        if(incomeResult.length !== 0){
                            incomeResult.forEach((element)=>{
                                console.log("loop ", element.value)
                                sumIncome[ element.time.month ] += element.value 
                            })
                        }
                        console.log("sumIncome : ", sumIncome)
                        var month = ["","يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليوز", "غشت", "شتنبر", "اكتوبر", "نونبر", "دجنبر"]
                        var years = []
                        spent.find().distinct("time.year").then(
                            (spentDistinctYear)=>{
                                income.find().distinct("time.year").then(
                                    (incomeDistinctYear)=>{
                                        if(spentDistinctYear.length !== 0){
                                            spentDistinctYear.forEach((element)=>{
                                                years.push(element)
                                            })
                                        }
                                        console.log("income distc")
                                        
                                        if(incomeDistinctYear.length !== 0){
                                            incomeDistinctYear.forEach((element)=>{
                                                if(years.indexOf(element) == -1)
                                                    years.push(element)
                                            })
                                        }
                                        if(years.length == 0) years.push(today.getFullYear())
    
                                        res.render('finance/equivalence',{
                                            month : month,
                                            sumSpent : sumSpent,
                                            sumIncome : sumIncome,
                                            years : years,
                                            selected: req.body.year
                    
                                        } )
                                    }
                                )
                            }
                        )
                        
                    }
                ).catch(
                    (error)=>{
                        console.log("errore in income equivalence : ", error)
                    }
                )
            }
        ).catch(
            (error)=>{
                console.log("errore in spent equivalence : ", error)
            }
        )

    }
    else if (mod === 'income') {
        if (obj.months === 'NaN') {
            model.find({
                'time.year': today.getFullYear()
            }).then((result) => {
                if (!result || result.length === 0) {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/revenus', {
                            found: false,
                            selected: obj.year,
                            month: month,
                            selectedMonth: -1,
                            years: years
                        })
                    })
                } else {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/revenus', {
                            found: true,
                            incomes: result,
                            selected: obj.year,
                            month: month,
                            selectedMonth: -1,
                            years: years
                        })
                    })
                }
            })
        } else {
            var m = _.indexOf(month, obj.months)
            console.log("income obj ", m)
            model.find({
                'time.year': obj.year,
                'time.month': req.body.months
            }).then((result) => {
                if (!result || result.length === 0) {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/revenus', {
                            found: false,
                            selected: obj.year,
                            month: month,
                            selectedMonth: req.body.months,
                            years: years
                        })
                    })
                } else {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/revenus', {
                            found: true,
                            incomes: result,
                            selected: obj.year,
                            month: month,
                            selectedMonth: req.body.months,
                            years: years
                        })
                    })
                }
            })

        }
    }
    else if (mod === 'spent') {
        if (obj.months === 'NaN') {
            model.find({
                'time.year': req.body.year
            }).then((result) => {
                if (!result || result.length === 0) {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/depense', {
                            found: false,
                            selected: obj.year,
                            month: month,
                            selectedMonth: -1,
                            years: years
                        })
                    })
                } else {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/depense', {
                            found: true,
                            spends: result,
                            selected: obj.year,
                            month: month,
                            selectedMonth: -1,
                            years: years
                        })
                    })
                }
            })
        } else {
            console.log("m == month", obj.months)
            model.find({
                'time.year': obj.year,
                'time.month': obj.months
            }).then((result) => {
                if (!result || result.length === 0) {
                    console.log("note found")
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/depense', {
                            found: false,
                            selected: obj.year,
                            month: month,
                            selectedMonth: obj.months-1,
                            years: years
                        })
                    })
                } else {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/depense', {
                            found: true,
                            spends: result,
                            selected: obj.year,
                            month: month,
                            selectedMonth: obj.months -1,
                            years: years
                        })
                    })
                }
            })
        }
    }
    else if (mod === 'salary') {
        if (obj.months === 'NaN') {
            model.find({
                'time.year': today.getFullYear()
            }).then((result) => {
                if (!result || result.length === 0) {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/salair', {
                            found: false,
                            selected: obj.year,
                            month: month,
                            selectedMonth: -1,
                            years: years
                        })
                    })
                } else {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/salair', {
                            found: true,
                            salaries: result,
                            selected: obj.year,
                            month: month,
                            selectedMonth: -1,
                            years: years
                        })
                    })
                }
            })
        } else {
            //var m = _.indexOf(month, obj.months)
            console.log("time travel : ", obj.year, obj.months)
            model.find({
                'time.year': obj.year,
                'time.month': obj.months
            }).then((result) => {
                if (!result || result.length === 0) {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/salair', {
                            found: false,
                            selected: obj.year,
                            month: month,
                            selectedMonth: obj.months,
                            years: years
                        })
                    })
                } else {
                    model.find().distinct('time.year').then((years) => {
                        res.render('finance/salair', {
                            found: true,
                            salaries: result,
                            selected: obj.year,
                            month: month,
                            selectedMonth: obj.months,
                            years: years
                        })
                    })
                }
            })
        }
    }
    else if (mod === 'track') {
        if (obj.months === 'NaN') {
            model.find({
                'time.year': req.body.year,
                "type": req.body.type
            }).then((result) => {
                if (!result || result.length === 0) {
                    model.find().distinct('time.year').then((years) => {
                        if(req.body.type === 'outcome'){
                            res.render('stock/outcomeTrack', {
                                found: false,
                                years: years,
                                selected: req.body.year,
                                selectedMonth: -1,
                                month: month,
                                days: 0,
                                selectedDay:-1
                            })
                        } else if(req.body.type === 'income'){
                            res.render('stock/incomeTrack', {
                                found: false,
                                years: years,
                                selected: req.body.year,
                                selectedMonth: -1,
                                month: month,
                                days: 0,
                                selectedDay:-1
                            })
                        }
                    })
                } else {
                    model.find().distinct('time.year').then((years) => {
                        if(req.body.type === 'outcome'){
                            res.render('stock/outcomeTrack', {
                                found: true,
                                years: years,
                                selected: req.body.year,
                                selectedMonth: -1,
                                month: month,
                                result: result,
                                days: 0,
                                selectedDay:-1
                            })
                        } else if(req.body.type === 'income'){
                            res.render('stock/incomeTrack', {
                                found: true,
                                years: years,
                                selected: req.body.year,
                                selectedMonth: -1,
                                month: month,
                                result: result,
                                days: 0,
                                selectedDay:-1
                            })
                        }

                    })
                }
            })
        } else {
            if(req.body.days === "NaN"){
                // var m = _.indexOf(month, obj.months)
                var m = req.body.months
                console.log("m == ", m)
                var nb = new Date(obj.year,m, 0).getDate()
                model.find({
                    'time.year': obj.year,
                    'time.month': m,
                    "type": req.body.type
                }).then((result) => {
                    if (!result || result.length === 0) {
                        model.find().distinct('time.year').then((years) => {
                            if(req.body.type === 'outcome'){
                                res.render('stock/outcomeTrack', {
                                    found: false,
                                    years: years,
                                    selected: req.body.year,
                                    selectedMonth: m,
                                    month: month,
                                    days: nb,
                                    selectedDay:-1
                                })
                            } else if(req.body.type === 'income'){
                                res.render('stock/incomeTrack', {
                                    found: false,
                                    years: years,
                                    selected: req.body.year,
                                    selectedMonth: m,
                                    month: month,
                                    days: nb,
                                    selectedDay:-1
                                })
                            }
                        })
                    } else {
                        model.find().distinct('time.year').then((years) => {
                            if(req.body.type === 'outcome'){
                                res.render('stock/outcomeTrack', {
                                    found: true,
                                    years: years,
                                    selected: req.body.year,
                                    selectedMonth: m,
                                    month: month,
                                    result: result,
                                    days: nb,
                                    selectedDay:-1
                                })
                            } else if(req.body.type === 'income'){
                                res.render('stock/incomeTrack', {
                                    found: true,
                                    years: years,
                                    selected: req.body.year,
                                    selectedMonth: m,
                                    month: month,
                                    result: result,
                                    days: nb,
                                    selectedDay:-1
                                })
                            }
                        })
                    }
                })
            }
            else {
                var m = req.body.months
                var nb = new Date(obj.year,m, 0).getDate()
                model.find({
                    'time.year': obj.year,
                    'time.month': m,
                    'time.day' : req.body.days,
                    "type": req.body.type
                }).then((result) => {
                    if (!result || result.length === 0) {
                        model.find().distinct('time.year').then((years) => {
                            if(req.body.type === 'outcome'){
                                res.render('stock/outcomeTrack', {
                                    found: false,
                                    years: years,
                                    selected: req.body.year,
                                    selectedMonth: m,
                                    month: month,
                                    days: nb,
                                    selectedDay:req.body.days
                                })
                            } else if(req.body.type === 'income'){
                                res.render('stock/incomeTrack', {
                                    found: false,
                                    years: years,
                                    selected: req.body.year,
                                    selectedMonth: m,
                                    month: month,
                                    days: nb,
                                    selectedDay:req.body.days
                                })
                            }
                        })
                    } else {
                        model.find().distinct('time.year').then((years) => {
                            if(req.body.type === 'outcome'){
                                res.render('stock/outcomeTrack', {
                                    found: true,
                                    years: years,
                                    selected: req.body.year,
                                    selectedMonth: m,
                                    month: month,
                                    result: result,
                                    days: nb,
                                    selectedDay:req.body.days
                                })
                            } else if(req.body.type === 'income'){
                                res.render('stock/incomeTrack', {
                                    found: true,
                                    years: years,
                                    selected: req.body.year,
                                    selectedMonth: m,
                                    month: month,
                                    result: result,
                                    days: nb,
                                    selectedDay:req.body.days
                                })
                            }
                        })
                    }
                })
            }

        }
    }
    else if(mod === "equipment"){
        var id = req.body.salleName
        model.find({"salleName": id}).then((result)=>{
            if(!result || result.length === 0){
                res.status(401).send()
            }else{
                model.find().distinct('salleName').then((ids)=>{
                    if(!ids || ids.length === 0){
                        res.status(401).send()
                    }else{

                        res.render('sales/list', {
                            chambers : result,
                            ids : ids,
                            selected : id
                        })
                    }
                })

            }
        })

    }
    else if (mod === 'product') {
        var type = req.body.type
        var genre =  req.body.genre
        model.find().distinct('type1').then((types)=>{
            model.find({'type1': type,'genre':genre}).then((result)=>{
                if(!result || result.length === 0){
                    var m = _.indexOf(types, type)
                    res.render('stock/products', {
                        types: types,
                        found: false,
                        selected: types[m],
                        selectedGenre: genre
                    })
                }
                else {
                    var m = _.indexOf(types, type)
                    res.render('stock/products', {
                        types: types,
                        result: result,
                        found: true,
                        selected: types[m],
                        selectedGenre: genre
                    })
                }
            })
        })

    }
    else if (mod === 'employee') {
        var name = req.body.name.split(' ')

        model.find({
            'firstName' : name[0],
            'lastName' : name[1]
        }).then((employee)=>{
            if(!employee || employee.length === 0){
                console.log('fouuund')
                model.find().then((employees) => {
                    if (!employees || employees.length === 0) {
                        res.status(404).send()
                    }
                    else {
                        res.render('finance/addSalair',{
                            employees: employees,
                            selected: 0
                        })
                    }
                })
            }
            else {

                model.find().then((employees) => {
                    var j = 0
                    for(var i = 0; i< employees.length; i++){
                        if(employees[i]._id.equals(employee[0]._id)){
                            j = i
                            console.log('found')
                            break
                        }
                    }
                    console.log(j)
                    res.render('finance/addSalair',{
                        employees: employees,
                        selected: j
                    })
                })
            }
        })
    }
    else if(mod ==='kid'){
        var choice = ['جميع الاطفال', 'الوفيات', 'الكفالات']
        if(obj.type === 'الوفيات'){
            console.log("death : ")
            model.find({deathDate:{$ne : null}}).then((result) =>{
                res.render('enfant/list', {kids : result, selected : 1, choice: choice})
            })
        }else if(obj.type === 'الكفالات'){
            console.log("partir")
            model.find({leavingDate:{$ne : null}}).then((result)=>{
                res.render('enfant/list', {kids : result, selected : 2, choice : choice})
            })
        }
        else{
            model.find().then((result)=>{
                if (!result || result.length === 0) {
                    console.log("not result")
                    res.header(401).send()
                } else {
                    console.log(result)
                    res.render('enfant/list', {kids : result, selected: 0, choice : choice})
                }
            })
        }
    }
})

module.exports = router