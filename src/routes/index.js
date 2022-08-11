const newRouter = require('./news')
const siteRouter = require('./site')
const course = require('./course')
const me = require('./me')

function route(app) {
  app.use('/news', newRouter)

  app.use('/me', me)

  app.use('/courses', course)

  app.use('/', siteRouter)
}

module.exports = route
