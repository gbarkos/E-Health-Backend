const express = require('express');
const userController = require('../controllers/userController');
const sharedPrescriptionsController = require('../controllers/sharedPrescriptionController');

const router = express.Router();

router
    .route('/')
    .get(userController.protect, sharedPrescriptionsController.getMySharedPrescriptions)
    .post(userController.protect, sharedPrescriptionsController.shareAPrescription);

router
    .route('/:id')
    .get(userController.protect, sharedPrescriptionsController.getMySelectedSharedPrescription);


module.exports = router;