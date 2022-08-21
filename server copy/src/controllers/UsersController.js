const db = require('../models')
class UserController {
  // [post] /users/create
  create(req, res, next) {
    const post = req.body
    db.Users.create(post)
      .then((hehe) => {
        res.json(hehe)
      })
      .catch((err) => {
        res.json(err)
      })
  }
  // [get] /users
  index(req, res, next) {
    res.json('this is users')
  }
}

module.exports = new UserController()
