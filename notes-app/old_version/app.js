// // First lesson
// const fs = require("fs"); // Node's File System Module
// fs.writeFileSync("notes.txt", "My name is Ronald Venegas.");

// /* ===============================================================================
//  * Challenge: Append a message to notes.txt
//  *
//  * 1. Use appendFileSync to append to the file
//  * 2. Run the script
//  * 3. Check your work by opening the file and viewing the appended text
// ================================================================================== */
// // Challenge solution:
// fs.appendFileSync("notes.txt", "\nThis is the appended message!!!");
// /* =============================================================================== */

// // Import your own file
// const utils = require("./utils.js");
// console.log(
//   `Hi, my name is ${utils.firstName} ${utils.lastName} and I'm ${utils.calcAge(
//     1991,
//     new Date().getFullYear()
//   )} years old!`
// );

// /* ===============================================================================
//  * Challenge: Define and use a function in a new file
//  *
//  * 1. Create a new file called notes.js
//  * 2. Create getNotes function that returns "Your notes..."
//  * 3. Export getNotes function
//  * 4. From app.js, load in and call the function printing message to console
// ================================================================================== */
// // Challenge solution:
// const getNotes = require("./notes");
// console.log(getNotes());
// /* =============================================================================== */

// Install and use NPM modules
// const validator = require("validator");
// console.log(validator.isEmail("ronaldvenegasp@gmail.com"));
// console.log(validator.isURL("https://mead.io/"));

// /* ===============================================================================
//  * Challenge: Use the chalk library in your project
//  *
//  * 1. Install version 2.4.1 of chalk
//  * 2. Load chalk into app.js
//  * 3. Use it to print the string "Success!" to the console in green
//  * 4. Test your work
//  * Bonus: Use docs to mess around with other styles. Make text bold and inversed
// ================================================================================== */
// // Challenge solution:
const chalk = require("chalk");
// console.log(chalk.green("Success!"));
// console.log(chalk.red.inverse.bold("Text bold and inversed!"));
// /* =============================================================================== */

// Global NPM modules and Nodemon
console.log(chalk.red.inverse.bold("Error!"));
