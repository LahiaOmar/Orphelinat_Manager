const mongoose = require('./../bd/mongoose')

var vaccinationSchema = mongoose.Schema({
    name: String,
    value : Date

})

var kidSchema = mongoose.Schema({

    name: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    birthday: {
        type: Date,
    },
    socialState: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    fatherName: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    motherName: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    motherAdress:{
        type: String
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    dateOfRegistration: {
        type: Date,
    },
    recordNumber: {
        type : String,
        default : "",
        trim : true
    },
    recordDate:{
        type: Date
    },
    recordSource:{
      type: String
    },
    abandonPlace :{
        type: String
    },
    cause: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        minLength: 1,
        trim: true,
    },
    leavingDate: {
        type: Date,
    },
    deathDate: {
        type: Date,
    },
    previousAssociation: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    hostingDays: {
        type: String,
        default: 0
    },
    vaccination: [vaccinationSchema],
    RegistrationNumber: {
        type: String,
        required: true
    },
    birthPlace: {
        type: Date,
        minLength: 1,
        trim: true,
        required: true
    },
    healthState: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    fatherCIN: {
        type: String,
        minLength: 1,
        trim: true
    },
    motherCIN: {
        type: String,
        minLength: 1,
        trim: true
    },
    time: {
        year: String,
        month: String,
        day: String
    },
    nbRoom: {
        type: String,
        minLength: 1,
        trim: true
    },
    nbBed: {
        type: String,
        minLength: 1,
        trim: true
    },
    createdBy: {
        type: String,
        required: true
    },
    Supervisor: {
        type: String,
        required: true
    }

})


kidSchema.methods.addVacc = function (index, date) {
    var kid = this
    kid.vaccination[index].value = date
    kid.save()
}

kidSchema.methods.addNumberVacc = function(tabNumer){
    var kid = this
    //console.log("tab : "+ tabNumer);
    for(var i=0; i<tabNumer.length; i++){
        console.log(tabNumer[i].id + ' ' + tabNumer[i].ok)
        kid.vaccination[tabNumer[i].id].number[ tabNumer[i].ok ] = 1
        console.log(kid.vaccination[tabNumer[i].id].number[ tabNumer[i].ok ])
        kid.save()
    }

}

kidSchema.statics.getFieldsArabic = ()=>{
    const arabicFields = ["الاسم الشخصي والعائلي", "تاريخ الازدياد", "الجنس", "الحالة الاجتماعية", "سم الأب", "اسم الأم", "الهاتف", "تاريخ الالتحاق بالمؤسسة", "سبب الالتحاق بالمؤسسة", "تاريخ المغادرة", "تاريخ الوفاة", "المؤسسة السابقة", "مدة الإقامة", "رقم التسجيل", "رقم ب.ت.و", "مكان الازدياد", "الحالة الصحية", "رقم المحضر", "رقم ب.ت.و للأب", "رقم ب.ت.و للأم", "رقم الغرفة", "رقم المرقد", "المشرفة التربوية"]
    return arabicFields
}

kidSchema.statics.getTable = (data)=>{
    const fieldsPrint = ['operation','accountantCode','checkNumber','paymentDate','checkValue','beneficiary','accountingReference']
    var table =[]
    var row = data.length
    for(var i=0; i<row; i++){
        var r = []
        r.push( data[i].name)
        if(data[i].birthday == null)
            r.push( data[i].birthday )
        else
            r.push( data[i].birthday.toISOString().slice(0, 10).split('-').reverse().join(",") )
        r.push( data[i].gender )
        r.push( data[i].socialState )
        r.push( data[i].fatherName )
        r.push( data[i].motherName )
        r.push( data[i].phoneNumber )
        if(( data[i].dateOfRegistration) == null)
            r.push( data[i].dateOfRegistration )
        else
            r.push( data[i].dateOfRegistration.toISOString().slice(0, 10).split('-').reverse().join(",") )
        r.push( data[i].cause )
        if(( data[i].leavingDate) == null)
            r.push( data[i].leavingDate )
        else
            r.push( data[i].leavingDate.toISOString().slice(0, 10).split('-').reverse().join(",") )
        if(( data[i].deathDate) == null)
            r.push( data[i].deathDate )
        else
            r.push( data[i].deathDate.toISOString().slice(0, 10).split('-').reverse().join(",") )
        r.push( data[i].previousAssociation )
        r.push( data[i].hostingDays )
        r.push( data[i].RegistrationNumber )
        r.push( data[i].CIN )
        if(( data[i].birthPlace) == null)
            r.push( data[i].birthPlace )
        else
            r.push( data[i].birthPlace.toISOString().slice(0, 10).split('-').reverse().join(",") )
        r.push( data[i].healthState )
        r.push( data[i].recordNumber )
        r.push( data[i].fatherCIN )
        r.push( data[i].motherCIN )
        r.push( data[i].nbRoom )
        r.push( data[i].nbBed )
        r.push( data[i].Supervisor )
        r.reverse()
        table.push(r)
    }
    
    return table
}
kidSchema.pre('save', function (next) {
    var kid = this
    var today = new Date()
    kid.time.year = today.getFullYear()
    kid.time.month = today.getMonth()
    kid.time.day = today.getDate()
    next()
})

kidSchema.methods.initialise = function(){
    var kid = this
    console.log("init")
    kid.vaccination.push({
        "name" : "POLIO1",
        "value": null
    })
    kid.vaccination.push({
        "name" : "POLIO2",
        "value": null
    })
    kid.vaccination.push({
        "name" : "POLIO3",
        "value": null
    })
    kid.vaccination.push({
        "name" : "HB1",
        "value": null
    })
    kid.vaccination.push({
        "name" : "PENTAVALENT1",
        "value": null
    })
    kid.vaccination.push({
        "name" : "PENTAVALENT2",
        "value": null
    })
    kid.vaccination.push({
        "name" : "PENTAVALENT3",
        "value": null
    })
    kid.vaccination.push({
        "name" : "P",
        "value": null
    })
    kid.vaccination.push({
        "name" : "RDTC",
        "value": null
    })
    kid.vaccination.push({
        "name" : "ROTATEQUE1",
        "value": null
    })
    kid.vaccination.push({
        "name" : "ROTATEQUE2",
        "value": null
    })
    kid.vaccination.push({
        "name" : "ROTATEQUE3",
        "value": null
    })
    kid.vaccination.push({
        "name" : "PNEUMO1",
        "value": null
    })
    kid.vaccination.push({
        "name" : "PNEUMO2",
        "value": null
    })
    kid.vaccination.push({
        "name" : "STEROGYLE1",
        "value": null
    })
    kid.vaccination.push({
        "name" : "STEROGYLE2",
        "value": null
    })
    kid.vaccination.push({
        "name" : "VITAMINE A 1",
        "value": null
    })
    kid.vaccination.push({
        "name" : "VITAMINE A 2",
        "value": null
    })
    kid.vaccination.push({
        "name" : "VITAMINE A 3",
        "value": null
    })
    kid.vaccination.push({
        "name" : "KONAKION",
        "value": null
    })
    console.log( kid.vaccination )
}

kidSchema.statics.getFields = function () {
    var Kid = this
    var array = []
    Kid.schema.eachPath(function (path) {
        if (path !== '_id' && path !== '__v') {
            array.push(path)
        }
    })
    return array
}

var kid = mongoose.model('kid', kidSchema)

module.exports = kid