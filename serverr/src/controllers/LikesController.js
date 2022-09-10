const db = require('../models')
class LikesController {
  // [get] /likes
  index(req, res, next) {
    const userId = req.query.userId
    db.Likes.findAll({
      where: {
        UserId: userId,
      },
    })
      .then((results) => {
        res.json(results)
      })
      .catch(() => {
        res.json({ error: "user don't have any like !!" })
      })
  }
  // [post] middleware Auth --> /likes/liked
  liked(req, res, next) {
    const { userId } = req.body
    const accountId = req.user.id
    db.Likes.findAll({
      where: {
        UserId: userId,
        AccountId: accountId,
      },
    }).then((isDefine) => {
      if (isDefine.length == 0) {
        db.Likes.create({
          UserId: userId,
          AccountId: accountId,
        }).then((data) => {
          res.json(data)
        })
      } else {
        db.Likes.destroy({
          where: {
            UserId: userId,
            AccountId: accountId,
          },
        }).then(() => {
          res.json('delete')
        })
      }
    })
  }
}

module.exports = new LikesController()
