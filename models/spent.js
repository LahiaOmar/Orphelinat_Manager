/**
 * Created by mrbej on 4/4/2017
 */

const mongoose = require('./../bd/mongoose')
const Equivalence = require('./../models/equivalence')

var spentSchema = mongoose.Schema({
    operation: {
        type: String,
        minlength: 1,
        required: true
    },
    accountantCode: {
        type: String,
        required: true
    },
    checkNumber: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    },
    checkValue: {
        type: Number,
        required: true
    },
    beneficiary: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    accountingReference: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        required: true
    },
    time: {
        year: String,
        month: String,
        day: String
    }
})


spentSchema.pre('save', function (next) {
    var spent = this
    console.log('saving')
    var today = spent.day
    spent.time.year = today.getFullYear()
    spent.time.month = today.getMonth()+1
    spent.time.day = today.getDate()
    next()
})


spentSchema.pre('remove', function (next) {
    var spent = this
    Equivalence.find({'year': spent.time.year}).then((results) => {
        results[0].modifyMonth(results[0].createdBy, spent.time.month, 0, -spent.checkValue)
    })
    next()
})

spentSchema.pre('update', function (next) {
    this.find({'_id': this._conditions._id}).then((result) => {
        var value = -result[0].checkValue + this.getUpdate().$set.checkValue
        Equivalence.find({'year': result[0].time.year}).then((results) => {
            results[0].modifyMonth(results[0].createdBy, result[0].time.month, 0, value)
        })
    })
    next()
})

spentSchema.statics.getFields = function () {
    var Spent = this
    var array = []
    Spent.schema.eachPath(function (path) {
        if (path !== '_id' && path !== '__v') {
            array.push(path)
        }
    })
    return array
}
spentSchema.statics.getTable = (data)=>{
    const fieldsPrint = ['operation','accountantCode','checkNumber','paymentDate','checkValue','beneficiary','accountingReference']
    var table =[]
    var row = data.length
    for(var i=0; i<row; i++){
        var r = []
        r.push( data[i].operation.toString() )
        r.push( data[i].accountantCode )
        r.push( data[i].checkNumber )
        r.push( data[i].paymentDate.toISOString().slice(0,10).split("-").reverse().join("-") )
        r.push( data[i].checkValue )
        r.push( data[i].beneficiary )
        r.push( data[i].accountingReference )
        r.reverse()
        table.push(r)
    }
    
    return table
}

spentSchema.statics.getFieldsArabic = ()=>{
    const arabicFields = ["العمليات","الرمز المحاسب", "رقم الشيك","تاريخ صرف الشيك", "مبلغ الشيك بالدرهم ","لفائدة", "المرجع المحاسبي"]
    
    return arabicFields
}



var spent = mongoose.model('spent', spentSchema)

module.exports = spent