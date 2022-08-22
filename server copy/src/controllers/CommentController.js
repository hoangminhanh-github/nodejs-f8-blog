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
  // [get] /search
}

module.exports = new CommentController()
