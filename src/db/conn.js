const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/cseSociety")
  .then(() => {
    console.log(`Connection Successful`);
  })
  .catch((e) => {
    console.log(e);
  });
