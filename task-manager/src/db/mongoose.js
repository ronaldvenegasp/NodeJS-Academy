const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
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
