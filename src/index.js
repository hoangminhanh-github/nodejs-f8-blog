const morgan = require('morgan')
const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const { urlencoded } = require('express')
const app = express()
const port = 3000

const route = require('./routes/index')
const db = require('./config/db/index')
const methodOverride = require('method-override')
// connect db
db.connect()

// http logger
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(morgan('combined'))
// template engine
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
  }),
)

app.set('view engine', '.hbs')
// set đường dẫn đến thư mục views
app.set('views', path.join(__dirname, 'resources/views'))

// route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
