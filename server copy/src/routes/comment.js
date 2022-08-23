const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')

router.post('/create', CommentController.create)
router.delete('/delete', CommentController.delete)
router.get('/:userId', CommentController.index)

module.exports = router
