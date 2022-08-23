const userRouter = require('./users')
const siteRouter = require('./site')
const commentRouter = require('./comment')
const accountRouter = require('./account')

function route(app) {
  app.use('/users', userRouter)
  app.use('/account', accountRouter)
  app.use('/comment', commentRouter)
  app.use('/', siteRouter)
}

module.exports = route
