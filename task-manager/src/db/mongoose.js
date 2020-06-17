const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((response) => {
    console.log("Succesfully connection to database!");
  })
  .catch((error) => {
    console.log("Error connecting to database!", error);
  });
