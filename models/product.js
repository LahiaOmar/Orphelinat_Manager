/**
 * Created by mrbej on 4/5/2017
 */

const mongoose = require('mongoose')

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type1: {
        type: String,
        required: true,
        trim: true
    },
    unit: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    },
    lastQuantity:{
        type: Number
    }
    ,
    quantityLimit : {
        type : Number,
        required : true
    },
    genre:{
        type: String,
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


productSchema.pre('save', function (next) {
    var product = this
    var today = new Date()
    product.time.year = today.getFullYear()
    product.time.month = today.getMonth()
    product.time.day = today.getDate()
    next()
})


productSchema.statics.getFields = function(){
    var Product = this
    var array = []
    Product.schema.eachPath(function (path) {
        if(path !== '_id' && path !=='__v'){
            array.push(path)
        }
    })
    return array
}
productSchema.statics.getTable = (data)=>{
    var table =[]
    var row = data.length
    for(var i=0; i<row; i++){
        var r = []
         r.push(data[i].quantity)
         r.push(data[i].unit)
         r.push(data[i].type1)
         r.push(data[i].name)
        table.push(r)
    }
    
    return table
}

productSchema.statics.getFieldsArabic = ()=>{
    const arabicFields = ["الاسم", "نوع المنتج", "وحدة", "الكمية"]
    
    return arabicFields
}
var product = mongoose.model('product', productSchema)


module.exports = product


