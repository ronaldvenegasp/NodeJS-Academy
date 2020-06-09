const yargs = require("yargs");
const notes = require("./notes");

/* ===============================================================================
 * Goal: Refactor all functions
 *
 * 1. If function is a method, use ES6 methos definition syntax
 * 2. Otherwise, use most concise arrow function possible
 * 3. Test your work!
================================================================================== */

// Create the "add" command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.addNote(argv.title, argv.body),
});

/* ===============================================================================
 * Challenge: Setup command option and function
 *
 * 1. Setup the remove command to take a required "--title" option
 * 2. Create and export a removeNote function from notes.js
 * 3. Call removeNote in remove command handler
 * 4. Have removeNote log the title of the note to be removed
 * 5. Tests your work using: node app.js remove --title="some title"
================================================================================== */
// Challenge solution:
// Create the "remove" command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.removeNote(argv.title),
});
/* =============================================================================== */

/* ===============================================================================
 * Goal: Wire up list command
 *
 * 1. Create and export listNotes from notes.js
 * - "Your notes" using chalk
 * - Print note title for each note
 * 3. Call listNotes from command handler
 * 4. Test your work!
================================================================================== */
// Challenge solution:
// Create the "listNotes" command
yargs.command({
  command: "listNotes",
  describe: "List the notes",
  handler: () => notes.listNotes(),
});
/* =============================================================================== */

/* ===============================================================================
 * Goal: Wire up read command
 *
 * 1. Setup --title option for read command
 * 2. Create readNote in note.js
 * - Search for note by title
 * - Find note and print title (styled) and body (plain)
 * - No note found? Print error in red
 * 3. Have the command handler call the function
 * 4. Test your work running a couple commands
================================================================================== */
// Challenge solution:
// Create the "readNote" command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.readNote(argv.title),
});

/* =============================================================================== */

yargs.parse();
