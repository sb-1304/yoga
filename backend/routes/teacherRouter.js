const express = require('express');
const router = express.Router();

const teacherController = require('../controller/teacherController');

router.get('/getTeacherDetails', teacherController.getTeacherDetails);
router.put('/updateDetails', teacherController.updateDetails);
router.get('/getAllTeachers', teacherController.getAllTeachers);

router.get('/getAllAsanas', teacherController.getAllAsanas);
router.post('/addAsanas', teacherController.addAsanas);
router.put('/updateAsanas', teacherController.updateAsanas);
router.delete('/deleteAsana/*', teacherController.deleteAsana);

module.exports = router;