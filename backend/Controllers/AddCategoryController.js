const Category = require("../model/categoryModel");

const AddCategoryController = async (req, res) => {
  const { name } = req.body;

  let existingCategoryName = await Category.find({ name: name.toLowerCase() });

  if (existingCategoryName.length > 0) {
    res.send({ error: "Category already exists" });
  } else {
    let cat = new Category({
      name: name.toLowerCase(),
    });

    cat.save();
    res.status(200).send({ success: "Category Created" });
  }

  console.log(name.toLowerCase());
};

module.exports = AddCategoryController;
