const express = require("express");
const _ = express.Router();
const auth = require("../api/auth.js");
const productRoutes = require("../api/productroutes.js");
_.use("/auth", auth);
_.use("/product", productRoutes);

module.exports = _;
