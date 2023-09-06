const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const calendarController = require('../controllers/calendarController');

router.post('/admin', authController.isUserExits, authController.register);
router.post(
  '/tutor',
  authController.isUserExits,
  authController.isNotAdminRegistration,
  authController.register,
);
router.post(
  '/student',
  authController.isUserExits,
  authController.isNotAdminRegistration,
  authController.register,
  calendarController.createCalendar,
);
router.post('/login', authController.login);

router.get('/all/tutor', userController.getUsers);
router.get('/all/student', userController.getUsers);
router.get('/:id', userController.getUser);

module.exports = router;
