const express = require('express')
const db = require('../models/index')
const UserController = require('../controllers/UsersController')
const router = express.Router()
router.post('/create', UserController.create)
router.get('/:id/details', UserController.details)
router.patch('/restore', UserController.reStore)
router.delete('/delete', UserController.delete)
router.get('/', UserController.index)

module.exports = router
