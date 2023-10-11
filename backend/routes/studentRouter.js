const express = require('express');
const router = express.Router();

const studentController = require('../controller/studentController');

router.get('/getStudentDetails', studentController.getStudentDetails);
router.get('/getAllStudents', studentController.getAllStudents);
router.put('/updateDetails', studentController.updateDetails);

router.get('/getAllBookings', studentController.getAllBookings);
router.post('/createBooking', studentController.createBooking);
router.put('/updateBooking', studentController.updateBooking);
router.delete('/deleteBooking/*', studentController.deleteBooking);

module.exports = router;