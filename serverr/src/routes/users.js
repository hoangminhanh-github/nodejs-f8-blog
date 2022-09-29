const express = require('express')

const UserController = require('../controllers/UsersController')

// multer
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/img/userImages')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

const router = express.Router()
router.post('/create', UserController.create)
router.get('/:id/details', UserController.details)
router.patch('/restore', UserController.reStore)
router.post('/edit', upload.array('avatar', 3), UserController.edit)
router.delete('/delete', UserController.delete)
router.get('/', UserController.index)

module.exports = router
