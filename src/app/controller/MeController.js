const Courses = require('../models/Course')
class MeController {
  // [get] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Courses.find({}).lean(), Courses.countDocumentsDeleted()]).then(([courses, deleteCount]) => {
      res.render('me/stored-courses', {
        courses,
        deleteCount,
        helpers: {
          sum(a, b) {
            return a + b
          },
        },
      })
    })

    // Courses.find({})
    //   .lean()
    //   .then((courses) => {
    //     res.render('me/stored-courses', {
    //       courses,
    //       helpers: {
    //         sum(a, b) {
    //           return a + b
    //         },
    //       },
    //     })
    //   })
    //   .catch(next)
    // Course.countDocumentsDeleted((err, result) => {
    //   console.log(result)
    // })
  }
  //
  trash(req, res, next) {
    Courses.findDeleted({})
      .lean()
      .then((courses) => {
        res.render('me/trash', {
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
}

module.exports = new MeController()
