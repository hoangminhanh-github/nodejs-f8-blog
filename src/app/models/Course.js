const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
var mongooseDelete = require('mongoose-delete')

// mongoose.plugin(slug)

const Course = new Schema(
  {
    name: { type: String, default: '' },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: ['name', '_id'], unique: true },
    videoId: { type: String },
    level: { type: String },
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true,
  },
)

// add plugins space
// Course.plugin(mongooseDelete, { overrideMethods: 'all' })
mongoose.plugin(slug)
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' })

module.exports = mongoose.model('Course', Course)
