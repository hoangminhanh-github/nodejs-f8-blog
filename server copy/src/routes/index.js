const userRouter = require('./users')
const siteRouter = require('./site')

function route(app) {
  app.use('/users', userRouter)
  app.use('/', siteRouter)
}

module.exports = route
