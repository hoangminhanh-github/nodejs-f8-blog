const userRouter = require('./users')
const siteRouter = require('./site')
const commentRouter = require('./comment')

function route(app) {
  app.use('/users', userRouter)
  app.use('/comment', commentRouter)
  app.use('/', siteRouter)
}

module.exports = route
