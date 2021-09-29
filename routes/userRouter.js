const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.login);

router
    .route("/")
    //.post(userController.createUser);
    // .get(userController.getAllUsers)
    // .post(userController.createUser);

router
    .route("/:id")
    // .get(userController.getUser)
    // .patch(userController.updateUser)
    // .delete(userController.deleteUser);

module.exports = router;