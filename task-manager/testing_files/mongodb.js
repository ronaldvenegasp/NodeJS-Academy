// CRUD: Create, Read, Update, Delete
const { MongoClient, ObjectID } = require("mongodb");

// Local connection
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// Local MongoDB instance
MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }
    const db = client.db(databaseName);

    // CREATE documents
    // db.collection("users").insertMany(
    //   [
    //     { name: "Lizeth", age: 24 },
    //     { name: "Alexandra", age: 24 },
    //     { name: "Venegas", age: 24 },
    //     { name: "Pulido", age: 24 },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert users to collection!");
    //     }
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     { description: "Task 1", completed: false },
    //     { description: "Task 2", completed: true },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert tasks to collection!");
    //     }
    //   }
    // );

    // db.collection("users").findOne({ name: "Ronald" }, (error, result) => {
    //   if (error) {
    //     return console.error("Unable to fetch data!");
    //   }
    //   if (result === null) {
    //     return console.error("No user found");
    //   }
    //   console.log(result);
    // });

    // READ documents
    // db.collection("users")
    //   .find({ age: 24 })
    //   .toArray((error, result) => {
    //     if (error) {
    //       return console.error("Unable to fetch data!");
    //     }
    //     if (result === null) {
    //       return console.error("No users found");
    //     }
    //     console.log(result);
    //   });

    // db.collection("users")
    //   .find({ age: 24 })
    //   .count((error, result) => {
    //     if (error) {
    //       return console.error("Unable to fetch data!");
    //     }
    //     if (result === null) {
    //       return console.error("No users found");
    //     }
    //     console.log(result);
    //   });

    // db.collection("tasks")
    //   .find(new ObjectID("5ee3e390b7df5e27e44190b7"))
    //   .toArray((error, result) => {
    //     if (error) {
    //       return console.error("Unable to fetch data!");
    //     }
    //     if (result === null) {
    //       return console.error("No users found");
    //     }
    //     console.log(result);
    //   });

    // db.collection("tasks")
    //   .find({ completed: true })
    //   .toArray((error, result) => {
    //     if (error) {
    //       return console.error("Unable to fetch data!");
    //     }
    //     if (result === null) {
    //       return console.error("No users found");
    //     }
    //     console.log(result);
    //   });

    // UPDATE documents
    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5ee3e8986465bd4f70951f7f"),
    //     },
    //     {
    //       $set: {
    //         name: "Guiovanni",
    //         age: 27,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: true,
    //     },
    //     {
    //       $set: {
    //         completed: false,
    //       },
    //     }
    //   )
    // .then((result) => {
    //   console.log(result);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    // DELETE documents
    db.collection("users")
      .deleteOne({
        name: "Alexandra",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // db.collection("users")
    //   .deleteMany({
    //     name: "Lizeth",
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
);
