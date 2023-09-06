const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    minLength: [10, 'Email must be at least 10 characters'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be at least 8 characters.'],
    select: false,
  },
  role: {
    type: String,
    enum: ['student', 'tutor', 'admin'],
    default: 'student',
  },
  course: {
    type: String,
    enum: [
      'frontend',
      'backend',
      'full stack',
      'data analytics',
      'data science',
      'ui/ux design',
    ],
    lowercase: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const hashedPassword = await bcrypt.hash(this.password, 12);

  this.password = hashedPassword;
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  candidatePassword,
  inputtedPassword,
) {
  return await bcrypt.compare(inputtedPassword, candidatePassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
