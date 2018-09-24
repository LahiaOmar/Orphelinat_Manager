const jwt = require('jsonwebtoken')
const mongoose = require('./../bd/mongoose')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        unique: true
    },
    token: {
        type: String
    },
    access: [],
    createdBy: {
        type: String
    }
})

UserSchema.statics.getFields = function () {
    var User = this
    var array = []
    User.schema.eachPath(function (path) {
        if (path !== '_id' && path !== '__v') {
            array.push(path)
        }
    })
    return array
}
UserSchema.methods.toJSON = function () {
    var user = this
    var userObject = user.toObject()
    return _.pick(userObject, ['_id', 'login', 'token', 'access'])
}

UserSchema.statics.findByCredentials = function (login, password) {
    var User = this
    return User.findOne({login}).then((user) => {
        if (!user) {
            return Promise.reject()
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

UserSchema.methods.modifyPassword = function (newPass) {
    var user = this
    user.password = newPass
    return user.save()
}
UserSchema.methods.modifyCredentials = function (newPass) {
    var user = this
    user.password = newPass
    return user.save()
}

UserSchema.methods.removeToken = function (token) {
    var user = this
    return user.update({
        token: ''
    })
}

UserSchema.pre('save', function (next) {
    var user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }

})

UserSchema.methods.generateAuthToken = function () {
    var user = this
    var token = jwt.sign({_id: user._id.toHexString()}, 'abc123').toString()
    user.token = token
    return user.save().then(() => {
        return token
    })
}

UserSchema.statics.findByToken = function (token) {
    var User = this
    var decoded
    try {
        decoded = jwt.verify(token, 'abc123')
    } catch (e) {
        return Promise.reject()
    }
    return User.findOne({
        _id: decoded._id,
        token: token
    })
}


var User = mongoose.model('User', UserSchema);

module.exports = User

