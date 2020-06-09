/* ===============================================================================
 * Challenge: Work with JSON and the file system
 *
 * 1. Load and parse the JSON data
 * 2. Change the name and age property using your info
 * 3. Stringify the changed object and overwrite the original data
 * 4. Tests your work by viewing data in the JSON file
================================================================================== */
// Challenge solution:
const fs = require("fs");

const parsedData = JSON.parse(fs.readFileSync("1-json.json").toString());
parsedData.name = "Ronald";
parsedData.age = 28;
fs.writeFileSync("1-json.json", JSON.stringify(parsedData));
/* =============================================================================== */
