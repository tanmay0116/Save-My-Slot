const express= require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { updateStatusController,doctorAppointmentsController,getDoctorByIdController,getDoctorInfoController,updateProfileController } = require('../controllers/doctorCtrl');
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);
router.post('/updateProfile',authMiddleware,updateProfileController);

router.post('/getDoctorById',authMiddleware,getDoctorByIdController)

router.get('/doctor-appointments',authMiddleware,doctorAppointmentsController);

router.post('/update-status',authMiddleware,updateStatusController);

module.exports = router