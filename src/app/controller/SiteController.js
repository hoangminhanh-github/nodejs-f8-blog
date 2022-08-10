const Course = require('../models/Course')
class SiteController {
  // [get] /home
  index(req, res, next) {
    Course.find({})
      // hàm lean đổi custom object thành construct object
      .lean()
      .then((courses) => res.render('home', { courses }))
      .catch(next)
  }
  // [get] /search
  search(req, res) {
    res.render('search')
  }
}

module.exports = new SiteController()
