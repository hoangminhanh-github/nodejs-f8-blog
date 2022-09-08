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
    // db.Likes.create({
    //   UserId: userId,
    //   AccountId: accountId,
    // })
    res.json({ userId, accountId })
  }
}

module.exports = new LikesController()
