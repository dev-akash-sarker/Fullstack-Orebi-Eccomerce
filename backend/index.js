require("dotenv").config();
const express = require("express");
const _ = require("./Routes");
const mongooseConfig = require("./config/mongooseConfig");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//cors
app.use(cors());
// database
mongooseConfig();
// json
app.use(express.json());
// routes
app.use(_);

app.listen(port, () => {
  console.log(`Backend Application is started and port ${port}`);
});
