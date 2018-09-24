const mongoose = require('./../bd/mongoose')
var Product = require('./../models/product')


var trackSchema = mongoose.Schema({
    productID:{
      type: String
    },
    name: {
        type: String,
        required: true
    },
    type1: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    ,
    totalPrice: {
        type: Number
    }
    ,
    note: {
        type: String
    },
    genre: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true
    },
    createdBy: {
        type: String
    },
    time: {
        year: String,
        month: String,
        day: String
    },
    day:{
        type:Date
    },
    lastQuantity:{
        type: String
    }
})

trackSchema.pre('save', function (next) {
    console.log("pre save TRACK -------")
    var Track = this
    console.log("TRACK this === ", Track)
    var today = new Date()
    Track.time.year = today.getFullYear()
    Track.time.month = today.getMonth()
    Track.time.day = today.getDate()
    Track.totalPrice = Track.price * Track.quantity
    if (Track.type === 'income') {
        Product.update({
            'type1': Track.type1,
            'name': Track.name,
            'genre': Track.genre
        }, {
            $inc: {
                quantity: Track.quantity
            }
            
        }).then((data) => {
            console.log(data)
        }).catch(
            (error)=>{
                console.log("eroor income update ", error)
            }
        )
    }
    else if (Track.type === 'outcome') {
        console.log("outcome update products : ", Track.quantity)
        Track.lastQuantity = Track.quantity
        Product.find({'_id' : Track.productID}).then(
            (dataFind)=>{
                Product.update({
                    'type1': Track.type1,
                    'name': Track.name
                },{
                    $inc: {
                        quantity: -Track.quantity
                    },
                    $set:{
                        lastQuantity : dataFind[0].quantity
                    }
                }).then((data) => {
                    console.log(" update oucome " , data)
                }).catch(
                    (error)=>{
                        console.log("erroor update product track ", error)
                    }
                )
            }
        ).catch(
            (error)=>{
                console.log("error find Product with track.prodID", error)
            }
        )
    }
    next()
})

trackSchema.statics.getFieldsArabic = ()=>{
    const arabicFields =  ["مشتريات/تبرعات", "االثمن الكلي", "لثمن الفردي", "الكمية", "الاسم", "اليوم"]
    return arabicFields.reverse()
}
trackSchema.statics.getTable = (data)=>{
    var table =[]
    var row = data.length
    console.log("data len ", data.length)
    for(var i=0; i<row; i++){
        var r = []
        r.push(data[i].genre)
        r.push(data[i].totalPrice)
        r.push(data[i].price)
        r.push(data[i].quantity)
        r.push(data[i].name)
        if(( data[i].day) == null)
            r.push( data[i].day )
        else
            r.push( data[i].day.toISOString().slice(0, 10).split('-').reverse().join(",") )
        // r.reverse()
        table.push(r)
    }
    return table
}

trackSchema.statics.getFields = function () {
    var Track = this
    var array = []
    Track.schema.eachPath(function (path) {
        if (path !== '_id' && path !== '__v') {
            array.push(path)
        }
    })
    return array
}

var track = mongoose.model('track', trackSchema)

module.exports = track