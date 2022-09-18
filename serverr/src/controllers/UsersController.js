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
  // [post] /users/:id/details
  details(req, res, next) {
    const userId = req.params.id
    db.Users.findOne({
      where: {
        id: userId,
      },
    })
      .then((hehe) => {
        res.json(hehe)
      })
      .catch((err) => {
        res.json(err)
      })
  }
  delete(req, res, next) {
    db.Users.destroy({
      where: {
        id: req.body.id,
      },
    }).then((data) => {
      res.json(data)
    })
  }
  // [get] /users
  index(req, res, next) {
    res.json('this is users')
  }
}

module.exports = new UserController()
