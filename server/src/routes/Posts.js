const express = require('express')
const db = require('../models/index')
const router = express.Router()
router.post('/create', function (req, res, next) {
  const post = req.query
  db.User.create(post)
    .then((hehe) => {
      res.json(hehe)
    })
    .catch(() => {
      console.log((create = 'err'))
    })
})

router.get('/', function (req, res, next) {
  db.User.findAll({
    where: {
      id: 2,
    },
  }).then((data) => {
    res.json(data)
  })
})
module.exports = router
