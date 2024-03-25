const express = require("express");
const _ = express.Router();
const api = require("../Routes/api");
const url = process.env.BASE_URL;
_.use(url, api);

module.exports = _;
