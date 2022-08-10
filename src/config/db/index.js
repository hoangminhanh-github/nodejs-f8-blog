const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/f8_education_dev')
    console.log('ok')
  } catch {
    console.log('err')
  }
}

module.exports = { connect }
