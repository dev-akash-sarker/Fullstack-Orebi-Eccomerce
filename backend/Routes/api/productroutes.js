const express = require("express");
const AddCategoryController = require("../../Controllers/AddCategoryController");
const ViewCategoryController = require("../../Controllers/ViewCategoryController");
const ViewSubCategoryController = require("../../Controllers/ViewSubCategoryController");
const AddSubCategoryController = require("../../Controllers/AddSubCategoryController");
const _ = express.Router();

_.post("/createcategory", AddCategoryController);
_.post("/createsubcategory", AddSubCategoryController);

_.get("/viewcategory", ViewCategoryController);
_.get("/viewsubcategory", ViewSubCategoryController);

module.exports = _;
