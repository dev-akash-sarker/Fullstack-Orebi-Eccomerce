const express = require("express");
const _ = express.Router();
const auth = require("../api/auth.js");
_.use("/auth", auth);

module.exports = _;
