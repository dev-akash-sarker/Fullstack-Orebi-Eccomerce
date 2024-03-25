const express = require("express");
const registrationController = require("../../Controllers/registrationController");
const secureAPI = require("../../SecureAPI/secureAPI");
const _ = express.Router();

_.get("/registration", secureAPI, registrationController);

module.exports = _;
