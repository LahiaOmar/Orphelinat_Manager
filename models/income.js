const mongoose = require('./../bd/mongoose')
const Equivalence = require('./../models/equivalence')

var incomeSchema = mongoose.Schema({
    source: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    accountantCode: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    documentNumber: {
        type: String,
    },
    transferDate: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    },

    note: {
        type: String,
        trim: true
    },
    createdBy: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        required: true
    },
    time : {
        year: String,
        month: String,
        day: String
    }
})

incomeSchema.pre('save', function (next) {
    var income = this
    var today = income.day
    income.time.year = today.getFullYear()
    income.time.month = today.getMonth()+1
    income.time.day = today.getDate()
    next()
})

incomeSchema.pre('remove', function (next) {
    var income = this
    Equivalence.find({'year': income.time.year}).then((results) => {
        results[0].modifyMonth(results[0].createdBy,income.time.month, -income.value, 0)
    })
    next()
})

incomeSchema.pre('update', function (next) {
    this.find({'_id': this._conditions._id}).then((result) => {
        var value = -result[0].value + this.getUpdate().$set.value
        Equivalence.find({'year': result[0].time.year}).then((results) => {
            results[0].modifyMonth(results[0].createdBy, result[0].time.month, value, 0)
        })
    })
    next()
})
incomeSchema.statics.getFieldsArabic = ()=>{
    const arabicFields =  ["مصدر المداخي", "الرمز المحاسبي", "رقم وثيقة التحويل", "تاريخ التحويل", "مبلغ التحويل بالدرهم", "ملاحظات"]
    
    return arabicFields
}
incomeSchema.statics.getTable = (data)=>{
    var table =[]
    var row = data.length
    for(var i=0; i<row; i++){
        var r = []
        r.push( data[i].source )
        r.push( data[i].accountantCode )
        r.push( data[i].documentNumber )
        r.push( data[i].transferDate.toISOString().slice(0,10).split("-").reverse().join("-") )
        r.push( data[i].value )
        r.push( data[i].note )
        table.push(r)
    }
    
    return table
}
incomeSchema.statics.getFields = function(){
    var Income = this
    var array = []
    Income.schema.eachPath(function (path) {
        if(path !== '_id' && path !=='__v'){
            array.push(path)
        }
    })
    return array
}

var income = mongoose.model('income', incomeSchema)

module.exports = income