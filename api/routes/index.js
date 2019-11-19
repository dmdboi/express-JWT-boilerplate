var express = require("express");
var router = express.Router();

var indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.index);
router.post("/", indexController.indexPost);

/* Passport testing */
router.get("/loggedin", indexController.success);
router.get("/error", indexController.error);

module.exports = router;
