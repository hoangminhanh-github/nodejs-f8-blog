const express = require('express')
const router = express.Router()

const courseController = require('../app/controller/CourseController')

router.get('/create', courseController.create)

router.post('/store', courseController.store)

router.get('/:id/edit', courseController.edit)

router.post('/handleFormAction', courseController.handleFormAction)

router.put('/:id/update', courseController.update)

router.get('/:id/delete', courseController.delete)

router.delete('/:id/delete/force', courseController.forceDelete)

router.patch('/:id/restore', courseController.restore)

router.get('/:slug', courseController.show)

module.exports = router
