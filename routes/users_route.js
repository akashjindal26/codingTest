const express = require('express');
const router = express.Router();
const user = require("../controllers/users_controller.js");
const validator = require("../validaotors.js");
const producer = require("../kafka/producer.js");
const consumer = require("../kafka/consumer");

// register new user api
router.post("/user", validator.singupValidation, producer.createProducer, user.signup);

//login user api
router.get("/user", validator.singinValidation,consumer.createConsumer, user.signin);

// getting user profile details
router.get("/user/getprofile", user.verifyUserLogin, user.getprofile);

module.exports = router;