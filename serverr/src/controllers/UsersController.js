const db = require('../models')
// const multer = require('multer')
// // multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './upload')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   },
// })

// const upload = multer({ storage: storage }).single('avatar')
// console.log(upload)

class UserController {
  // [post] /users/create
  async create(req, res, next) {
    const post = req.body
    const files = req.files
    const newUser = await db.Users.create(post)
    files.map((item) => {
      db.UserImages.create({ UserId: newUser.id, image: item.originalname })
    })
    res.json(newUser)
  }
  // [post] /users/:id/details
  details(req, res, next) {
    const userId = req.params.id
    db.Users.findOne({
      where: {
        id: userId,
      },
      include: [db.Likes, db.UserImages],
    })
      .then((hehe) => {
        res.json(hehe)
      })
      .catch((err) => {
        res.json(err)
      })
  }
  // [delete] /users/delete
  delete(req, res, next) {
    const isForce = req.body.force

    db.Users.destroy({
      where: {
        id: req.body.id,
      },
      force: isForce,
    }).then((data) => {
      res.json(data)
    })
  }
  //[patch] users/re-store
  reStore(req, res, next) {
    const id = req.body.params.id
    db.Users.restore({
      where: {
        id: id,
      },
    }).then((data) => {
      res.json(data)
    })
  }
  // [patch] users/edit
  async edit(req, res, next) {
    const formData = req.body
    const files = req.files
    const user = await db.Users.findByPk(formData.id)
    await user.update(formData)
    files.map((item) => {
      db.UserImages.create({ UserId: formData.id, image: item.originalname })
    })
  }
  // [post]/users/upload
  uploadhehe(req, res, next) {
    console.log(req)
  }

  // [get] /users
  index(req, res, next) {
    res.json('this is users')
  }
}

module.exports = new UserController()
