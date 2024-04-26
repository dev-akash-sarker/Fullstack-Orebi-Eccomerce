// Using Node.js `require()`
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ["approved", "waiting", "rejected"],
    default: "waiting",
  },
});

module.exports = mongoose.model("Category", categorySchema);
