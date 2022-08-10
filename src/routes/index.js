const newRouter = require('./news')
const siteRouter = require('./site')
const course = require('./course')
function route(app) {
  // app.get('/', (req, res) => {
  //   res.render('home')
  // })

  // app.get('/news', (req, res) => {
  //   res.render('news')
  // })
  app.use('/news', newRouter)

  // app.get('/search', (req, res) => {
  //   res.render('search')
  // })
  app.use('/course', course)

  app.use('/', siteRouter)
}

module.exports = route
