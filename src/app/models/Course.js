const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema({
  name: { type: String, default: '' },
  description: { type: String },
  image: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  slug: { type: String },
})
module.exports = mongoose.model('Course', Course)
