const SubCategory = require("../model/SubCategoryModel");
const Category = require("../model/categoryModel");

let ViewSubCategoryController = async (req, res) => {
  const data = await SubCategory.find().populate("categoryId");
  res.send(data);
};

module.exports = ViewSubCategoryController;
