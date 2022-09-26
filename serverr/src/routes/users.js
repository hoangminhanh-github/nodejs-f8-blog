const express = require('express')

const UserController = require('../controllers/UsersController')

// multer
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

const router = express.Router()
router.post('/create', UserController.create)
router.post('/upload', upload.single('avatar'), UserController.uploadhehe)
router.get('/:id/details', UserController.details)
router.patch('/restore', UserController.reStore)
router.patch('/edit', UserController.edit)
router.delete('/delete', UserController.delete)
router.get('/', UserController.index)

module.exports = router
