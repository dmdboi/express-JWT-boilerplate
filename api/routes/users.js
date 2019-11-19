const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const userController = require("../controllers/userController");

router.get("/info/:username", checkAuth, userController.getUser);

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.delete("/delete/:userID", userController.deleteUser);

module.exports = router;
