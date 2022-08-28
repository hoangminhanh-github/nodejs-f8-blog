const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.post('/create', validateToken, CommentController.create)
router.delete('/delete', CommentController.delete)
router.get('/:userId', CommentController.index)

module.exports = router
