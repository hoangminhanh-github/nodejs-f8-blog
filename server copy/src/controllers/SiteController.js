const db = require('../models')
class SiteController {
  // [get] /
  index(req, res, next) {
    db.Users.findAll().then((data) => {
      res.json(data)
    })
  }
  // [get] /search
}

module.exports = new SiteController()
