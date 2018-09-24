const mongoose = require('./../bd/mongoose')


var beneficiarySchema  = mongoose.Schema({
    kidName: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    birthDay: {
        type: Date,
        required: true
    },
    birthPlace: {
        type: Date,
        required: true
    },
    CIN: {
        type: String,
        trim: true
    },
    familyState: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    dateOfRegistration: {
        type: Date,
        required: true
    },
    leavingDay: {
        type: Date,
    },
    serialNumber: {
        type: String,
        required: true
    },
    healthState: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    familyName: {
        type: String,
        minLength: 1,
        trim: true,
    },
    familyCIN: {
        type: String,
        minLength: 6,
        trim: true
    },
    address: {
        type: String,
        minLength: 1,
        trim: true
    },
    phoneNumber: {
        type: String,
        minLength: 1,
        trim: true
    },
    job: {
        type: String,
        minLength: 1,
        trim: true
    },
    socialState: {
        type: String,
        minLength: 1,
        trim: true
    },
    createdBy: {
        type: String
    },
    time : {
        year: String,
        month: String,
        day: String
    },
    note: {
        type: String,
        trim: true
    }
})

beneficiarySchema.pre('save', function (next) {
    var benificiaire = this
    var today = new Date()
    benificiaire.time.year = today.getFullYear()
    benificiaire.time.month = today.getMonth()
    benificiaire.time.day = today.getDate()
    next()
})
beneficiarySchema.statics.getFieldsArabic = ()=>{
    const arabicFields = ["الاسم الكامل", "تاريخ الازدياد", "مكان الازدياد", "رقم ب.ت.و", "الوضعية العائلية", "تاريخ الالتحاق بالمؤسسة", "رقم التسجيل", "تاريخ المغادرة", "الحالة الصحية", "اسم الولي", "رقم ب.ت.و", "مكان الإقامة", "الهاتف", "المهنة", "الوضعية الاجتماعية", "ملاحظة"]
    return arabicFields
}
beneficiarySchema.statics.getTable = (data)=>{
    var table =[]
    var row = data.length
    for(var i=0; i<row; i++){
        var r = []
        r.push( data[i].kidName )
        if(( data[i].birthDay) == null)
            r.push( data[i].birthDay )
        else
            r.push( data[i].birthDay.toISOString().slice(0, 10).split('-').reverse().join(",") )
        if(( data[i].birthPlace) == null)
            r.push( data[i].birthPlace )
        else
            r.push( data[i].birthPlace.toISOString().slice(0, 10).split('-').reverse().join(",") )
        r.push( data[i].CIN)
        r.push( data[i].familyState )
        if(( data[i].dateOfRegistration) == null)
            r.push( data[i].dateOfRegistration )
        else
            r.push( data[i].dateOfRegistration.toISOString().slice(0, 10).split('-').reverse().join(",") )
        r.push( data[i].serialNumber )
        if(( data[i].leavingDay) == null)
            r.push( data[i].leavingDay )
        else
            r.push( data[i].leavingDay.toISOString().slice(0, 10).split('-').reverse().join(",") )
        r.push( data[i].healthState )
        r.push( data[i].familyName )
        r.push( data[i].familyCIN )
        r.push( data[i].address )
        r.push( data[i].phoneNumber )
        r.push( data[i].job )
        r.push( data[i].socialState )
        r.push( data[i].note )
        r.reverse()
        table.push(r)
    }
    
    return table
}
beneficiarySchema.statics.getFields = function(){
    var Benificiaire = this
    var array = []
    Benificiaire.schema.eachPath(function (path) {
        if(path !== '_id' && path !=='__v'){
            array.push(path)
        }
    })
    return array
}

var beneficiary = mongoose.model('benificiaire', beneficiarySchema)

module.exports = beneficiary