const express = require('express')
const db = require('../models/index')
const UserController = require('../controllers/UsersController')
const router = express.Router()

router.get('/create', UserController.create)
router.get('/:id/details', UserController.details)
router.get('/', UserController.index)

module.exports = router
