const mongoose = require('../../bd/mongoose')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
var User = require('../../models/user')
var authenticate = require('../middleware/authenticate')

router.get('/',authenticate ,  (req, res) => {
    res.send('/users/reset')
})

module.exports = router