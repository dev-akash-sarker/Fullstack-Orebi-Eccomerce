// Using Node.js `require()`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ["approved", "waiting", "rejected"],
    default: "waiting",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("SubCategory", subcategorySchema);
