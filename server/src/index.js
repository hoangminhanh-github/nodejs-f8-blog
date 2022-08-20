const express = require('express')
const db = require('./models/index')
const connectDB = require('./config/db')
const route = require('./routes/index')
const cors = require('cors')
// ///////
const app = express()
app.use(cors())
route(app)

connectDB()

app.listen(3001, () => {
  console.log('Server is running om port 3001')
})
