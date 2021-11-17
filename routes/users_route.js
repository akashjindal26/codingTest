const express = require('express');
const router = express.Router();
const user = require("../controllers/users_controller.js");
const validator = require("../validators.js");
const producer = require("../kafka/producer.js");
const consumer = require("../kafka/consumer");

// register new user api
router.post("/user", validator.sing_up_Validation, producer.createProducer, user.signup);

//login user api
router.get("/user", validator.sing_in_Validation, consumer.createConsumer, user.sign_in);

// getting user profile details
router.get("/user/get_profile", user.verifyUserLogin, user.get_profile);

module.exports = router;