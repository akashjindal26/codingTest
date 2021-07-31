const express = require('express');
const router = express.Router();
const user = require("../controllers/users_controller.js");
const validator = require("../validaotors.js");


router.post("/user", validator.singupValidation, user.signup);
router.get("/user", validator.singinValidation, user.signin);
router.get("/user/getprofile", user.verifyUserLogin, user.getprofile);

module.exports = router;