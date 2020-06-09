const fs = require("fs");
const chalk = require("chalk");

// Function to add a new note
const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title); // This stops when it finds a match
  debugger;
  // if (duplicateNotes.length === 0) {
  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
  } else {
    console.log("Note title taken!");
  }
};

// Function to remove a note
const removeNote = (title) => {
  const notes = loadNotes();
  const restNotes = notes.filter((note) => note.title !== title);
  if (notes.length > restNotes.length) {
    console.log(chalk.green.inverse("Note succesfully removed!"));
    saveNotes(restNotes);
  } else {
    console.log(chalk.red.inverse("Note not founded!"));
  }
};

// Function to list notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse("Your notes:"));
  notes.forEach((note) => console.log(note.title));
};

// Function to read a note
const readNote = (title) => {
  const notes = loadNotes();
  const wantedNote = notes.find((note) => note.title === title);
  if (wantedNote) {
    console.log(
      chalk.green.inverse(wantedNote.title + " -> ") + " " + wantedNote.body
    );
  } else {
    console.log(chalk.red.inverse("Note not founded!"));
  }
};

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json").toString());
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) =>
  fs.writeFileSync("notes.json", JSON.stringify(notes));

module.exports = {
  addNote,
  readNote,
  listNotes,
  removeNote,
};
