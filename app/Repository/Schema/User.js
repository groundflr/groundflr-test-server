const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  age: Number,
  firstName: String,
  lastName: String,
},{
  timestamps: true,
  toJSON: { virtuals: true, },
  toObject: { virtuals: true, },
  versionKey: false,
},)

module.exports = mongoose.model('User', schema)
