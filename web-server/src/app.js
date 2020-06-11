const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

// Setting the index.hbs file as index
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ronald Venegas",
  });
});

// Setting the about.hbs file as about page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ronald Venegas",
  });
});

/* ===============================================================================
* Goal: Create a partial for the footer
*
* 1. Setup the template for the footer partial "Created by Some Name"
* 2. Render the partial at the bottom of all three pages
* 3. Test your work by visiting all three pages
================================================================================== */

/* ===============================================================================
* Goal: Create a template for help page
*
* 1. Setup a help template to render a help message to the screen
* 2. Setup the help route and render the template with an example message
* 3. Visit the route in the browser and see your help message print
* 4. Visit both in the browser to test your work
================================================================================== */
// Challenge solution
// Setting the help.hbs file as help page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help message to test this page",
    name: "Ronald Venegas",
  });
});
/* =============================================================================== */

/* ===============================================================================
* Goal: Setup two new routes
*
* 1. Create a  HTML page for about with "About" title
* 2. Create a  HTML page for help with "Help" title
* 3. Remove the old route handlers for both
* 4. Visit both in the browser to test your work
================================================================================== */
// Challenge solution
// app.com/help
// app.get("/help", (req, res, next) => {
//   res.send([
//     {
//       name: "Ronald",
//       age: 28,
//     },
//     {
//       name: "Claudia",
//       age: 29,
//     },
//     {
//       name: "Lizeth",
//       age: 24,
//     },
//   ]);
// });

/* ===============================================================================
* Goal: Setup two new routes
*
* 1. Setup an about route and render a page title
* 2. Setup a weather route and render a page title
* 3. Test your work by visiting both in the browser
================================================================================== */
/* ===============================================================================
* Goal: Update routes
*
* 1. Set up about route to render a title with HTML
* 2. Setup a weather route to send back JSON
*   - Object with forecast and location strings
* 3. Test your work by visiting both in the browser
================================================================================== */
// Challenge solution:
// app.com/about
// app.get("/about", (req, res, next) => {
//   res.send("<h1>About page</h1>");
// });

// app.com/weather
app.get("/weather", (req, res, next) => {
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});
/* =============================================================================== */

/* ===============================================================================
* Goal: Create and render a 404 page with handlebars
*
* 1. Set up the template to render the header and footer
* 2. Setup the template to render an error message in a paragraph
* 3. Render the template for both 404 routes
*   - Page not found
*   - Help article not found
* 3. Test your work. Visit /what and /help/units
================================================================================== */
// Challenge solution:
// 404 page or page not found
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ronald Venegas",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ronald Venegas",
    errorMessage: "Page not found",
  });
});
/* =============================================================================== */

// Start the server at por 3000
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
