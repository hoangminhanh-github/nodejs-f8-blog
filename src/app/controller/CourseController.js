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
    formData.slug = req.body.name
    const course = new Course(formData)
    course
      .save()
      .then(() => {
        res.redirect(`/courses/${formData.name}`)
      })
      .catch(() => {
        console.log('create fail')
      })
  }
}

module.exports = new CourseController()
