const express = require('express')
const db = require('../models')
const router = express.Router()
const siteController = require('../controllers/SiteController')

router.get('/', siteController.index)

module.exports = router
