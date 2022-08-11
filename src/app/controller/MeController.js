const Courses = require('../models/Course')
class MeController {
  // [get] /me/stored/courses
  storedCourses(req, res, next) {
    Courses.find({})
      .lean()
      .then((courses) => {
        res.render('me/stored-courses', {
          courses,
          helpers: {
            sum(a, b) {
              return a + b
            },
          },
        })
      })
      .catch(next)
  }
  //
}

module.exports = new MeController()
