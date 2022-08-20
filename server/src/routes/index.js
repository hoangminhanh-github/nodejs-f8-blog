const postsRouter = require('./posts')
const siteRouter = require('./site')

function route(app) {
  app.use('/posts', postsRouter)
  app.use('/', siteRouter)
}

module.exports = route
