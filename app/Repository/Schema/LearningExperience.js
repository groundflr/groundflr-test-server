const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  description: String,
  title: String,
  users: [{
    autopopulate: true,
    ref: 'User',
    type: mongoose.Types.ObjectId
  }],
},{
  timestamps: true,
  toJSON: { virtuals: true, },
  toObject: { virtuals: true, },
  versionKey: false,
},)

schema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('LearningExperience', schema)
