const express = require('express')
const db = require('./models')
const connectDB = require('./config/db')
const route = require('./routes/index')
const cors = require('cors')
const bodyParser = require('body-parser')
// ///////

const app = express()

// body-parser giúp nhập được req từ client
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// cors Kết nối client với server
app.use(cors())

// custom func router
route(app)

connectDB()

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running om port 3001')
  })
})
// { alter: true }
