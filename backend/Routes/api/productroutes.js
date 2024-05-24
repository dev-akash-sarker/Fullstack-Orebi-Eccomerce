const express = require("express");
const AddCategoryController = require("../../Controllers/AddCategoryController");
const ViewCategoryController = require("../../Controllers/ViewCategoryController");
const ViewSubCategoryController = require("../../Controllers/ViewSubCategoryController");
const AddSubCategoryController = require("../../Controllers/AddSubCategoryController");
const verifyToken = require("../../middlewere/verifyToken");
const secureAPI = require("../../SecureAPI/secureAPI");
const _ = express.Router();
const multer = require("multer");
const productController = require("../../Controllers/productController");
const productViewController = require("../../Controllers/productViewController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

_.post("/createcategory", secureAPI, verifyToken, AddCategoryController);
_.post("/createsubcategory", AddSubCategoryController);
_.post("/createproduct", upload.single("avatar"), productController);

_.get("/allproducts", productViewController);
_.get("/viewcategory", ViewCategoryController);
_.get("/viewsubcategory", ViewSubCategoryController);

module.exports = _;
