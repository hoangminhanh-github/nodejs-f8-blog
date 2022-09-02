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
  liked(req, res, next) {
    const { userId, accountId } = req.body
    db.Likes.create({
      UserId: userId,
      AccountId: accountId,
    })
  }
}

module.exports = new LikesController()
