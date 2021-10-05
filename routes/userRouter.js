const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.get('/myProfile', userController.protect, userController.getMyProfile);

router
    .route("/")
    //.post(userController.createUser);
    //.get( userController.protect);
    //.post(userController.createUser);

router
    .route("/:id")
    // .get(userController.getUser)
    // .patch(userController.updateUser)
    // .delete(userController.deleteUser);

module.exports = router;