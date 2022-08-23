const db = require('../models')
const bcrypt = require('bcrypt')
class AccountController {
  // [post] /account/register
  register(req, res, next) {
    const { account, password } = req.body
    bcrypt.hash(password, 10).then((hash) => {
      db.Account.create({
        firstName: account,
        password: hash,
      }).then(res.json('Create account success !!'))
    })
  }
  // [post] /account/login
  login(req, res, next) {
    const { firstName, password } = req.body
    db.Account.findOne({
      where: {
        firstName: firstName,
      },
    })
      .then((result) => {
        bcrypt.compare(password, result.password, function (err, kq) {
          if (kq) {
            res.json(result)
          } else {
            res.json((err = 'Password for this account is wrong !!!!'))
          }
        })
      })
      .catch((err) => {
        res.json('Account user not found')
      })
  }
}

module.exports = new AccountController()
