const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username must be filled'],
      minlength: [3, 'username minimal 3 karakter'],
    },
    email: {
      type: String,
      required: [true, 'email must be filled'],
      validate: {
        validator: validator.isEmail,
        message: 'input must be valid format email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [
        function () {
          return !this.is_oauth;
        },
        'password must be filled',
      ],
      minlength: [6, 'password minimal 6 karakter'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    is_verified: { type: Boolean, default: false },
    is_oauth: { type: Boolean, default: false },
    picture: { type: String, default: '' },
    bio: { type: String, maxlength: 300 },
    last_login: { type: Date },
    token_verify: { type: String },
    token_expires: { type: Date },
    starred_products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Product',
      default: [],
    },
  },
  { timestamps: true }
);

// method untuk compare passsword
userSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
