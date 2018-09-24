/**
 * Created by mrbej on 4/4/2017
 */

const mongoose = require('./../bd/mongoose')


var salarySchema = mongoose.Schema({
    employee: {
        type: String,
        required: true

    },
    employeeRole: {
        type: String,
        required: true
    },
    CIN: {
        type: String,
        required: true
    },
    basicSalary: {
        type: String,
        required: true
    },
    increaseInSalary: {
        type: String,
        required: true
    },
    totalSalary: {
        type: String,
        required: true
    },
    familyCompensation: {
        type: String,
        required: true
    },
    absence: {
        type: String,
        required: true
    },
    advance:{
        type: String,
        required: true
    },
    IGR: {
        type: String,
        required: true
    },
    CNSS: {
        type: String,
        required: true
    },
    cnssNumber: {
        type: String,
    }
    ,
    medicalInsurance:{
        type: String,
        required: true
    },
    paymentTotal: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    day : {
        type: Date,
        required: true
    },
    time : {
        year: String,
        month: String,
        day: String
    }
})


salarySchema.pre('save', function (next) {
    var Salary = this
    var today = Salary.day
    Salary.time.year = today.getFullYear()
    Salary.time.month = today.getMonth()+1
    Salary.time.day = today.getDate()
    next()
})
salarySchema.statics.getFieldsArabic = ()=>{
    const arabicFields =["كيفية الأداء", "المبلغ الصافي للأداء", "التغطية الصحية", "CNSS", "IGR", "تسبيق", "غيابات", "تعويضات عائلية", "الأجرة الإجمالية", "زيادة في الأجرة", "الأجرة الأساسية", "ب.ت.و", "المهمة", "الاسم الشخصي والعائلي"]
    const tab = ["التغطية الصحية", "CNSS", "IGR", "تسبيق", "غيابات"]
    return arabicFields
}
salarySchema.statics.getTable = (data)=>{
    var table =[]
    var row = data.length
    for(var i=0; i<row; i++){
        var r = []
        r.push(data[i].paymentMethod)
        r.push(data[i].paymentTotal)
        r.push(data[i].medicalInsurance)
        r.push(data[i].CNSS)
        r.push(data[i].IGR)
        r.push(data[i].advance)
        r.push(data[i].absence)
        r.push(data[i].familyCompensation)
        r.push(data[i].totalSalary)
        r.push(data[i].increaseInSalary)
        r.push(data[i].basicSalary)
        r.push(data[i].CIN)
        r.push(data[i].employeeRole)
        r.push(data[i].employee)
        // r.reverse()
        table.push(r)
    }
    
    return table
}
salarySchema.statics.getFields = function () {
    var Salary = this
    var array = []
    Salary.schema.eachPath(function (path) {
        if (path !== '_id' && path !== '__v') {
            array.push(path)
        }
    })
    return array
}

var salary = mongoose.model('salary',salarySchema)

module.exports = salary
