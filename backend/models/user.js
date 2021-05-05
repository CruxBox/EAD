const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true,
    unique: true,
    minlength:6
  },
 // movies:[{ type: Schema.Types.ObjectId, ref: 'Movie' }]
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
    }
  }
});

const User = mongoose.model('User', userSchema,);

module.exports = User;