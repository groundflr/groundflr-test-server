const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  description: String,
},{
  timestamps: true,
  toJSON: { virtuals: true, },
  toObject: { virtuals: true, },
  versionKey: false,
},)

schema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Example', schema)
