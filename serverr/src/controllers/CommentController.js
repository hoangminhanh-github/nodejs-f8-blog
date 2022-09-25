const db = require('../models')
class CommentController {
  // [get] /comment
  async index(req, res, next) {
    const userId = req.params.userId
    const comment = await db.Comments.findAll({
      where: {
        userId: userId,
      },
      include: db.Account,
    })
    const user = await db.Users.findByPk(userId)

    res.json({ user, comment })
  }

  // [post] /comment/create
  create(req, res, next) {
    const comment = req.body.comment
    const userId = req.body.id
    const firstName = req.user.firstName
    const accountId = req.user.id
    db.Comments.create({
      commentBody: comment,
      UserId: userId,
      firstName: firstName,
      AccountId: accountId,
    })
      .then((results) => {
        res.json(results)
      })
      .catch(next)
  }

  delete(req, res, next) {
    const commentId = req.body.commentId
    const userId = req.body.userId

    db.Comments.destroy({
      where: {
        UserId: userId,
        id: commentId,
      },
    })
      .then((results) => {
        res.json(results)
      })
      .catch(next)
  }
}

module.exports = new CommentController()
