const express = require('express');
const userController = require('./../controllers/userController');
const diagnosisController = require('./../controllers/diagnosisController');

const router = express.Router();

router.get('/', userController.protect, diagnosisController.getAllDiagnoses);
router.get('/:id', userController.protect, diagnosisController.getDiagnosis);

module.exports = router;