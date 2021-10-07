const express = require('express');
const appointmentController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.get('/myProfile', userController.protect, userController.getMyProfile);

module.exports = router;