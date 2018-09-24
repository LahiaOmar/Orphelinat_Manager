var express = require('express')
var router = express.Router();
var authenticate = require('./../../routes/middleware/authenticate')
var equivalence = require('./../../models/equivalence')
var spent = require('./../../models/spent')
var income = require('./../../models/income')

router.get('/', authenticate, (req, res) => {
    var today = new Date()
    var sumSpent = Array(13)
    var sumIncome = Array(13)
    sumSpent.fill(0,0,13)
    sumIncome.fill(0,0,13)
    spent.find({"time.year" : today.getFullYear()}).then(
        (spentResult)=>{
            income.find({"time.year" : today.getFullYear()}).then(
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
                                        selected: today.getFullYear()
                
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
})

module.exports = router