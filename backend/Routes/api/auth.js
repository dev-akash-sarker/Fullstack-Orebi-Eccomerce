const express = require("express");
const registrationController = require("../../Controllers/registrationController");
const secureAPI = require("../../SecureAPI/secureAPI");
// const linkController = require("../../Controllers/linkController");
const otpController = require("../../Controllers/otpController");
const resendController = require("../../Controllers/resendController");
const loginController = require("../../Controllers/loginController");
const EmailLinkController = require("../../Controllers/EmailLinkController");
const LinkController = require("../../Controllers/linkController");
const _ = express.Router();

_.post("/registration", secureAPI, registrationController);
_.post("/login", secureAPI, loginController);
_.post("/otpverification", otpController);
_.post("/resendemail", resendController);
_.post("/email", EmailLinkController);
_.post("/linkverify", LinkController);

module.exports = _;
