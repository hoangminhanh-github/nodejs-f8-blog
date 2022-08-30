const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/AccountController')

router.post('/login', AccountController.login)
router.post('/check-login', AccountController.checkLogin)
router.post('/register', AccountController.register)

module.exports = router
