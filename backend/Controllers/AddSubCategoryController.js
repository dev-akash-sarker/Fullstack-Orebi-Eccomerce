const SubCategory = require("../model/SubCategoryModel");

const AddSubCategoryController = async (req, res) => {
  const { name, categoryId } = req.body;

  let existingCategoryName = await SubCategory.find({
    name: name.toLowerCase(),
  });

  if (existingCategoryName.length > 0) {
    res.send({ error: "SubCategory already exists" });
  } else {
    let category = new SubCategory({
      name: name.toLowerCase(),
      categoryId: categoryId,
    });

    category.save();
    res.status(200).send({ success: "SubCategory Created" });
  }
};

module.exports = AddSubCategoryController;
