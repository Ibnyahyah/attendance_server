const mongoose = require('mongoose');

const calendarSchema = mongoose.Schema({
  studentId: {
    type: String,
    require: [true, 'A calender must have a userId.'],
    unique: true,
  },
  totalWeeks: {
    type: Number,
    default: 0,
  },
  currentDays: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  graduationDate: Date,
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
