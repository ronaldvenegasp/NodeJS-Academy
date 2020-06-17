require("../src/db/mongoose.js");
const Task = require("../src/db/models/Task");

// Task.findByIdAndDelete("5ee9268d50d17a30c0239aa5")
//   .then((result) => {
//     console.log(result);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((tasks) => {
//     console.log(tasks);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const documents = await Task.countDocuments({ completed: false });
  return {
    task,
    documents,
  };
};

deleteTaskAndCount("5ee950383c910c472811e2d7")
  .then((result) => {
    const { task, documents } = result;
    console.log("task:", task);
    console.log("documents:", documents);
  })
  .catch((error) => {
    console.error(error);
  });
