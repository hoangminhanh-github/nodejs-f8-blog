const express = require('express')
const db = require('../models/index')
const router = express.Router()

router.get('/', function (req, res, next) {
  db.User.findAll().then((data) => {
    res.json(data)
  })
})
module.exports = router
