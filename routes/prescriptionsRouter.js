const express = require('express');
const userController = require('../controllers/userController');
const prescriptionsController = require('./../controllers/prescriptionsController');

const router = express.Router();

router
    .route('/')
    .get(userController.protect, prescriptionsController.getMyPrescriptions);

router
    .route('/:id')
    .get(userController.protect, prescriptionsController.getMySelectedPrescription);


module.exports = router;