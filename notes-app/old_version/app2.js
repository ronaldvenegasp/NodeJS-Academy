const yargs = require("yargs");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Node title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Node body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argvs) {
    console.log("Title: ", argvs.title);
    console.log("Body: ", argvs.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  handler: function () {
    console.log("Removing a note");
  },
});

// Add, remove, read and list commands

/* ===============================================================================
 * Challenge: Add two new commands
 *
 * 1. Setup command to support "list" command (print placeholder message for now)
 * 2. Setup command to support "read" command (print placeholder message for now)
 * 3. Test your work by reunning both commands and ensure correct outpur
================================================================================== */
// Challenge solution:
// Create list command
yargs.command({
  command: "list",
  describe: "List notes",
  handler: function () {
    console.log("Listing the notes!");
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function () {
    console.log("Rading a note!");
  },
});
/* =============================================================================== */

/* ===============================================================================
 * Challenge: Add an option to yargs
 *
 * 1. Setup a body option for the add command
 * 2. Configure a description, make it required and for it to be a string
 * 3. Log the body value in the habdler function
 * 4. Tests your work!
================================================================================== */
// Challenge solution:
// run: node app.js --title="The title" --body="The body"
yargs.parse();
/* =============================================================================== */
