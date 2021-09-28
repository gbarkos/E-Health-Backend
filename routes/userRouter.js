const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router
    .route("/")
    .post((req, res) => {
        res.status(201).json({"status": "success"});
    });
    // .get(userController.getAllUsers)
    // .post(userController.createUser);

router
    .route("/:id")
    // .get(userController.getUser)
    // .patch(userController.updateUser)
    // .delete(userController.deleteUser);

module.exports = router;