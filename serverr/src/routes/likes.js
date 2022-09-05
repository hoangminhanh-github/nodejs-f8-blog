const express = require('express')
const router = express.Router()
const likesController = require('../controllers/LikesController')

router.get('/', likesController.index)
router.post('/liked', likesController.liked)

module.exports = router
