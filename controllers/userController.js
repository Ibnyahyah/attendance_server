const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const calendar = require('./calendarController');

exports.getUsers = catchAsync(async (req, res, next) => {
  const path =
    req.originalUrl.split('/')[req.originalUrl.split('/').length - 1];
  const users = await User.find({ role: path.toLowerCase() });

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("Can't find user with this id", 404));
  const calendars = await calendar.getCalendar(req.params.id);
  let data = { user };
  if (calendars) {
    data = { data, calendars: calendars };
  }
  res.status(200).json({
    status: 'success',
    data: data,
  });
});
