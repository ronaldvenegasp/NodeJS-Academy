require("../src/db/mongoose.js");
const User = require("../src/db/models/User");

// User.findByIdAndUpdate("5ee9279e2151ae46cc38d835", {
//   name: "Ronald Pulido",
// })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({
//       name: "Ronald Pulido",
//     });
//   })
//   .then((documents) => {
//     console.log(documents);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const updateNameAndCount = async (id, name) => {
  const user = await User.findByIdAndUpdate(id, {
    name,
  });
  const documents = await User.countDocuments({
    name,
  });
  return {
    user,
    documents,
  };
};

updateNameAndCount("5ee924ccc02a454b482b96bc", "Guiovanni Venegas")
  .then((result) => {
    const { user, documents } = result;
    console.log("documents:", documents);
    console.log("user:", user);
  })
  .catch((error) => {
    console.error(error);
  });
