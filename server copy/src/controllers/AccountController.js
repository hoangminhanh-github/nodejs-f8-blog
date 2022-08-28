const db = require('../models')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

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
        bcrypt.compare(password, result.password, function (err, allowUser) {
          if (allowUser) {
            const accessToken = sign({ firstName: allowUser.userName, id: allowUser.id }, 'important')
            res.json(accessToken)
          } else {
            res.json({ error: 'Password for this account is wrong !!!!' })
          }
        })
      })
      .catch((err) => {
        res.json({ error: 'account not found' })
      })
  }
}

module.exports = new AccountController()
