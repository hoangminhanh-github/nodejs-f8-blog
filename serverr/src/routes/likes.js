const express = require('express')
const router = express.Router()
const likesController = require('../controllers/LikesController')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.post('/liked', validateToken, likesController.liked)
router.get('/', likesController.index)

module.exports = router
