const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')

router.get('/:userId', CommentController.index)

module.exports = router
