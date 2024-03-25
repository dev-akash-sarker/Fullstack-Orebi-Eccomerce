require("dotenv").config();
const express = require("express");
const _ = require("./Routes");
const mongooseConfig = require("./config/mongooseConfig");
const app = express();
const port = process.env.PORT || 8000;

// database
mongooseConfig();

// routes
app.use(_);

app.listen(port, () => {
  console.log(`Backend Application is started and port ${port}`);
});
