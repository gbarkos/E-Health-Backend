const express = require('express');
const userController = require('./../controllers/userController');
const hospitalController = require('./../controllers/hospitalController');

const router = express.Router();

router.get('/', userController.protect, hospitalController.getHospitals);

module.exports = router;