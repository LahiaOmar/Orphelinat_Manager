const mongoose = require('./../bd/mongoose')

var equipmentSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        required: true
    },
    salleName: {
        type: String,
        trim: true,
        required: true
    },
    time : {    
        year: String,
        month: String,
        day: String
    },
    note : {
        type: String,
    },
    donor:{
        type : String
    }
})


equipmentSchema.pre('save', function (next) {
    var equipment = this
    var today = new Date()
    equipment.time.year = today.getFullYear()
    equipment.time.month = today.getMonth()
    equipment.time.day = today.getDate()
    next()
})

equipmentSchema.statics.getFields = function(){
    var Chamber = this
    var array = []
    Chamber.schema.eachPath(function (path) {
        if(path !== '_id' && path !=='__v'){
            array.push(path)
        }
    })
    return array
}
equipmentSchema.statics.getTable = (data)=>{
    var table =[]
    var row = data.length
    for(var i=0; i<row; i++){
        var r = []
        r.push( data[i].name )
        r.push( data[i].quantity )
        r.push( data[i].checkNumber )
        r.push( data[i].donor )
        r.push( data[i].note )
        table.push(r)
    }
    
    return table
}

equipmentSchema.statics.getFieldsArabic = ()=>{
    const arabicFields =  ["رقم جهاز", "اسم جهاز", "الكمية", "الجهة المانحة", "ملاحضة"]
    
    return arabicFields
}
var equipment = mongoose.model('equipment',equipmentSchema)

module.exports = equipment