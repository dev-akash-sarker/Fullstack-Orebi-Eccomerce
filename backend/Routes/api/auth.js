const express = require("express");
const registrationController = require("../../Controllers/registrationController");
const secureAPI = require("../../SecureAPI/secureAPI");
// const linkController = require("../../Controllers/linkController");
const otpController = require("../../Controllers/otpController");
const resendController = require("../../Controllers/resendController");
const _ = express.Router();

_.post("/registration", secureAPI, registrationController);
_.post("/otpverification", otpController);
_.post("/resendemail", resendController);

module.exports = _;
