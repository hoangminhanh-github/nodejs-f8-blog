const Course = require('../models/Course')
class CourseController {
  // [get] /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      // hàm lean đổi custom object thành construct object
      .lean()
      .then((course) => res.render('courseDetails', { course }))
      .catch(next)
  }
  // .then((course) => res.json(course))
}

module.exports = new CourseController()
