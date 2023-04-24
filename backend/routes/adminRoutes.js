const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { deleteUserAccountController,deleteAccountController,getAllUsersController, getAllDoctorsController,changeAccountStatusController } = require('../controllers/adminCtrl')

const router = express.Router()

router.get('/getAllUsers',authMiddleware,getAllUsersController);
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

router.post('/changeAccountstatus',authMiddleware,changeAccountStatusController);
router.post('/deleteAccount',authMiddleware,deleteAccountController);
router.post('/delete-user-account',authMiddleware,deleteUserAccountController);
module.exports=router;