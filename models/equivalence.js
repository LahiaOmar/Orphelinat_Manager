const mongoose = require('mongoose')
var spent = require('./spent')
var income = require('./income')

var month = new mongoose.Schema({
    income: {
        type: Number,
        required: true
    },
    outcome: {
        type: Number,
        required: true
    },
    equiv: {
        type: Number,
        required: true
    }
})

var equivalenceSchema = mongoose.Schema({
    year : {
        type : String,
        required: true,
        unique : true,
        trim: true
    },
    months: [month],
    createdBy: {
        type: String,
        required: true
    },
    time : {
        year: String,
        month: String,
        day: String
    }

})

equivalenceSchema.pre('save', function (next) {
    var Equivalence = this
    var today = new Date()
    Equivalence.time.year = today.getFullYear()
    Equivalence.time.month = today.getMonth()
    Equivalence.time.day = today.getDate()
    next()
})

equivalenceSchema.methods.addMonth = function (num, income, spent) {
    var Equivalence = this
    Equivalence.months[num] = {
        income: Number.parseInt(income),
        outcome: Number.parseInt(spent),
        equiv: Number.parseInt(income) - Number.parseInt(spent)
    }
}

equivalenceSchema.methods.modifyMonth = function (createdBy,num, income, spent) {
    var object = this
    object.createdBy = createdBy
    if(object.months[num]) {
        object.months[num].income += Number.parseInt(income)
        object.months[num].outcome += Number.parseInt(spent)
        object.months[num].equiv = (object.months[num].income - object.months[num].outcome)
    } else {
        console.log('hello')
        object.months[num] = {
            income: Number.parseInt(income),
            outcome: Number.parseInt(spent),
            equiv: Number.parseInt(income) - Number.parseInt(spent)
        }
    }
    console.log(object)
    object.save()

}

equivalenceSchema.methods.getEquivalenceOfTheYear = (year)=>{
    var sumSpent = Array(13).fill(0)
    var sumIncome = Array(13).fill(0)

    spent.find({"time.year" : year}).then(
        (spentResult)=>{
            income.find({"time.year" : year}).then(
                (incomeResult)=>{
                    if(spentResult.length !== 0){
                        spentResult.forEach((element)=>{
                            sumSpent.push(element)
                        })
                    }

                    if(incomeResult.length !== 0){
                        incomeResult.forEach((element)=>{
                            sumIncome.push(element)
                        })
                    }
                    

                }
            )

        }
    )
}
equivalenceSchema.statics.getFieldsArabic = ()=>{
    const arabicFields = ["الموازنة بالدرهم", "مجموع النفقات بالدرهم", "مجموع المداخيل بالدرهم", "الشهور"]
    return arabicFields
}
equivalenceSchema.statics.getTable = (data)=>{

}
var equivalence = mongoose.model('equivalence', equivalenceSchema)

module.exports = equivalence;