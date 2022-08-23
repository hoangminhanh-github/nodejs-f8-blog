const db = require('../models')
class CommentController {
  // [get] /comment
  index(req, res, next) {
    const userId = req.params.userId
    db.Comments.findAll({
      where: {
        userId: userId,
      },
    })
      .then((result) => {
        res.json(result)
      })
      .catch(() => {
        res.json(err)
      })
  }

  // [post] /comment/create
  create(req, res, next) {
    const comment = req.body.comment
    const userId = req.body.id
    db.Comments.create({
      commentBody: comment,
      UserId: userId,
    })
      .then((results) => {
        res.json(results)
      })
      .catch(next)
  }

  delete(req, res, next) {
    const commentId = req.body.commentId
    const userId = req.body.userId
    console.log(commentId)
    console.log(userId)
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
