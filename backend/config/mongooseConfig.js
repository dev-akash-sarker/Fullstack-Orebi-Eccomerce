const mongoose = require("mongoose");

const mongooseConfig = () => {
  const db = process.env.DB;
  mongoose.connect(db).then(() => console.log("MongoDB Connected!"));
};

module.exports = mongooseConfig;
