var User = require('./../../models/user');

var authenticate = (req, res, next) => {

    var token = req.cookies.user
    console.log("here", token)
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject()
        }
        req.user = user
        next()
    }).catch((e) => {
        res.redirect('login')
        next()
    })

}

module.exports = authenticate