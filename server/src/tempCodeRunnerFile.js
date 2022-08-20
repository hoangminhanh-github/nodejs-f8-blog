const express = require('express')
const app = express()

const db = require('./models/index')
const connectDB = require('./config/db')
// const postsRouter = require('./routes/Posts')
// app.use('/posts', function (req, res, next) {
//   db.User.create({
//     id: 11,
//     firstName: 'hoanganh11',
//     lastName: 'linh11',
//     email: 'hoangan11@gmail.com',
//     createAt: 'dffdfsdf',
//     updateAt: 'fdfdfdfdf',
//   }).then((gido) => {
//     res.json(gido)
//   })
// })

// app.use('/hehe', function (req, res, next) {
//   db.User.findAll({
//     where: {
//       firstName: 'hoanganh',
//     },
//   }).then((result) => {
//     console.log('ok')
//     res.json(result)
//   })
// })
// app.use('/posts', postsRouter)
app.use('/', function (req, res, next) {
  // db.User.findAll().then((result) => {
  //   console.log('ok')
  //   res.json(result)
  // })
  res.send('ok')
})
connectDB()

app.listen(3000, () => {
  console.log('Server is running om port 3000')
})
