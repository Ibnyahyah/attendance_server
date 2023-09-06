const JWT = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (data) => JWT.sign(data, process.env.JWT_SECRET);

exports.isUserExits = async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });
  if (user)
    return next(new AppError('A user already exists with this email', 400));
  next();
};

exports.isNotAdminRegistration = async function (req, res, next) {
  const url = req.originalUrl;
  if (!url.includes('admin')) {
    req.course = req.body.course;
  }
  next();
};

exports.register = catchAsync(async (req, res, next) => {
  const role =
    req.originalUrl.split('/')[req.originalUrl.split('/').length - 1];
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: role,
    course: req.course,
  });

  const token = signToken({ id: newUser._id });
  if (role === 'student') {
    req.studentId = newUser._id;
  }
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    token,
  });
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return next(new AppError('Please provide Email and password!', 401));
  }

  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.isPasswordCorrect(user.password, password))) {
    return next(new AppError('Invalid Email and password!', 401));
  }

  const token = signToken({ id: user._id });

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    token,
  });
});
