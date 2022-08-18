const Course = require('../models/Course')
class CourseController {
  // [get] /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      // hàm lean đổi custom object thành construct object
      .lean()
      .then((course) => res.render('courses/show', { course }))
      .catch(next)
  }
  // [get] courses/create
  create(req, res, next) {
    res.render('courses/create')
  }
  // [post] courses/store
  store(req, res, next) {
    const formData = req.body
    const course = new Course(formData)
    course
      .save()
      .then(() => {
        res.redirect(`/courses/${formData.name}`)
      })
      .catch((next) => {})
  }
  // [get] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .lean()
      .then((course) => {
        res.render('courses/edit', { course })
      })
      .catch(next)
  }
  // [post --> method-override --> put] /courses/:id/update
  update(req, res, next) {
    const formData = req.body
    Course.updateOne({ _id: req.params.id }, formData).then(res.redirect('/')).catch(next)
  }
  // [get] /courses/:id/delete
  delete(req, res, next) {
    Course.delete({ _id: req.params.id }).then(res.redirect('/me/stored/courses')).catch(next)
  }
  // [delete]/courses/:id/delete/force
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id }).then(res.redirect('/me/trash/courses')).catch(next)
  }
  // [delete]/courses//multi-delete/force
  multiForceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id }).lean().then(res.redirect('/me/trash/courses')).catch(next)
  }

  // [patch] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .lean()
      .then(() => {
        res.redirect('/me/trash/courses')
      })
      .catch(next)
  }
  //[post] /courses/handle-form-action
  handleFormAction(req, res, next) {
    // res.json(req.body)
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.courseIds } })
          .lean()
          .then(res.redirect('/me/stored/courses'))
          .catch(next)
        break
      case 'force-delete':
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
          .lean()
          .then(res.redirect('back'))
          .catch(next)
        break
      case 'multi-restore':
        Course.restore({ _id: { $in: req.body.courseIds } })
          .lean()
          .then(() => {
            res.redirect('back')
          })
          .catch(next)
        break
      default:
        res.redirect('back')
    }
  }
}

module.exports = new CourseController()
