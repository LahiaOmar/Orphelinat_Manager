const mongoose = require('./../bd/mongoose')

var employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        minLength: 1,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 1,
        required: true,
        trim: true
    },
    birthDay: {
        type: Date,
        required: true
    },
    birthPlace: {
        type: Date,
        required: true,
    },
    dateOfRegistration :{
        type : Date,
        trim : true
    },
    dateOfLeaving:{
        type : Date,
        trim : true
    },
    CIN: {
        type: String,
        minLength: 6,
        required: true,
        trim: true
    },
    CNSS: {
        type: String,
        minLength: 6,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        minLength: 10,
        required: true,
        trim: true
    },
    address: {
        type: String,
        minLength: 1,
        required: true,
        trim: true
    },
    role: {
        type: String,
        minLength: 1,
        required: true,
        trim: true
    },
    academicDegree: {
        type: String,
        minLength: 1,
        required: true,
        trim: true
    },
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

employeeSchema.pre('save', function (next) {
    var Employee = this
    var today = new Date()
    Employee.time.year = today.getFullYear()
    Employee.time.month = today.getMonth()
    Employee.time.day = today.getDate()
    next()
})

employeeSchema.statics.getFields = function(){
    var Employee = this
    var array = []
    Employee.schema.eachPath(function (path) {
        if(path !== '_id' && path !=='__v'){
            array.push(path)
        }
    })
    return array
}
employeeSchema.statics.getTable = (data)=>{
    var table =[]
    var row = data.length
    for(var i=0; i<row; i++){
        var r = []
        r.push( data[i].firstName )
        r.push( data[i].lastName )
        if(( data[i].birthDay) == null)
            r.push( data[i].birthDay )
        else
            r.push( data[i].birthDay.toISOString().slice(0, 10).split('-').reverse().join(",") )
        if(( data[i].birthPlace) == null)
            r.push( data[i].birthPlace )
        else
            r.push( data[i].birthPlace.toISOString().slice(0, 10).split('-').reverse().join(",") )
        if(( data[i].dateOfRegistration) == null)
            r.push( data[i].dateOfRegistration )
        else
            r.push( data[i].dateOfRegistration.toISOString().slice(0, 10).split('-').reverse().join(",") )
        if(( data[i].dateOfLeaving) == null)
            r.push( data[i].dateOfLeaving )
        else
            r.push( data[i].dateOfLeaving.toISOString().slice(0, 10).split('-').reverse().join(",") )
        r.push( data[i].CIN )
        r.push( data[i].CNSS )
        r.push( data[i].phoneNumber )
        r.push( data[i].address )
        r.push( data[i].role )
        r.push( data[i].academicDegree )
        r.reverse()
        table.push(r)
    }
    
    return table
}

employeeSchema.statics.getFieldsArabic = ()=>{
    const arabicFields = ["الاسم العائلي", "الاسم الشخصي", "تاريخ الازدياد", "مكان الازدياد", "تاريخ التسجيل", "تاريخ المغادرة", "رقم البطاقة الوطنية", "رقم التسجيل في ص.و.ض.ج", "رقم الهاتف", "العنوان", "المهمة داخل المركز", "المستوى الدراسي"]
    
    return arabicFields
}
var employee = mongoose.model('employee',  employeeSchema)

module.exports = employee