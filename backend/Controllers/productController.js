const Product = require("../model/product");

const productController = async (req, res) => {
  const { name } = req.body;
  console.log(req.file.filename);
  let product = new Product({
    name: name,
    image: `/uploads/${req.file.filename}`,
  });

  product.save();
  res.status(200).send({ success: "Product Created" });
};

module.exports = productController;
