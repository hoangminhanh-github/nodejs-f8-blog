const db = require('../models')
const { Op } = require('sequelize')
class SiteController {
  // [get] /
  async index(req, res, next) {
    const isParanoid = req.query.paranoid
    const amount = await db.Users.count({
      where: {
        deletedAt: null,
      },
    })
    if (isParanoid) {
      db.Users.findAll({
        where: {
          deletedAt: {
            [Op.not]: null,
          },
        },
        include: [db.Likes, db.UserImages],
        paranoid: false,
      }).then((data) => {
        res.json(data)
      })
    } else {
      db.Users.findAll({
        include: [db.Likes, db.UserImages],
      }).then((data) => {
        res.json(data)
      })
    }
  }
  // [get] /search
}

module.exports = new SiteController()
