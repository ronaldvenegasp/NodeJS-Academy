const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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

// Setting the help.hbs file as help page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help message to test this page",
    name: "Ronald Venegas",
  });
});

// app.com/weather
app.get("/weather", (req, res, next) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address term",
    });
  }

  geoCode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

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

// Start the server at por 3000
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
