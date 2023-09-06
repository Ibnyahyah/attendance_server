const catchAsync = require('../utils/catchAsync');

const Calendar = require('../models/calenderModel');

const courseDuration = (course) => {
  let weeks = 12;
  switch (course) {
    case 'frontend':
      weeks = 15;
      break;
    case 'backend':
      weeks = 15;
      break;
    case 'full stack':
      weeks = 30;
      break;
    case 'data science':
      weeks = 12;
      break;
    case 'data analytics':
      weeks = 12;
      break;
    case 'ui/ux design':
      weeks = 12;
      break;
    default:
  }

  return weeks;
};

exports.createCalendar = async (req, res, next) => {
  const isCalendarExist = await Calendar.findOne({ _id: req.studentId });
  const totalWeeks = courseDuration(req.course.toLowerCase());
  const graduationDate = Date.now() + totalWeeks * 7 * 24 * 60 * 60 * 1000;
  if (!isCalendarExist) {
    return await Calendar.create({
      studentId: req.studentId,
      currentDays: 1,
      totalWeeks,
      graduationDate: graduationDate,
    });
  }
};

exports.getCalendar = async (studentId) => {
  const calendar = Calendar.findOne({ studentId: studentId });
  return await calendar;
};
