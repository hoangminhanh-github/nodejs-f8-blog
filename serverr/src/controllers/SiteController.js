const db = require('../models')
const { Op } = require('sequelize')
class SiteController {
  // [get] /
  async index(req, res, next) {
    const isParanoid = req.query.paranoid
    let currOffset = 0
    currOffset = req.query.offset
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
      let currOffset = 1
      if (req.query.offset) {
        currOffset = req.query.offset
      }
      db.Users.findAll({
        include: [db.Likes, db.UserImages],
        // order: [['firstName', 'ASC']],
        offset: 5 * (Number(currOffset) - 1),
        limit: 5,
        // paranoid: false,
      }).then((data) => {
        res.json(data)
      })
    }
  }
  // [get] /search
}

module.exports = new SiteController()
