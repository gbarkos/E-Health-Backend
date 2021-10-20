const express = require('express');
const userController = require('../controllers/userController');
const shareDiagnosisController = require('../controllers/sharedDiagnosisController');


const router = express.Router();

router.post('/', userController.protect, shareDiagnosisController.shareDiagnosis);
router.get('/', userController.protect, shareDiagnosisController.getSharedDiagnoses);

router.get('/:id',userController.protect, shareDiagnosisController.getSelectedSharedDiagnosis);


module.exports = router;