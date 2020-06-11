// const request = require("request"); // Request module has been deprecated
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast.js");
const chalk = require("chalk");

// // Address for the requests
// const address = "Bucaramanga";

/* ===============================================================================
* Goal: Accept location via command line argument
*
* 1. Access the command line argument without yargs
* 2. Use the string value as the input for geocode
* 3. Only geocode if a location was provided
* 4. Test your work with a couple locations
================================================================================== */
// Challenge solution:
/* ===============================================================================
* Goal: Use both, destructuring and property shorthand in weather app
*
* 1. Use destructuring in app.js, forecast,js and geocode.js
* 2. Use property shorthand in forecast.js and geocode.js
* 3. Test your work and ensure app still works
================================================================================== */
// Challenge solution:
if (process.argv[2]) {
  geoCode(process.argv[2], (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return console.log(chalk.red.inverse("Error: ", error));
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(chalk.red.inverse("Error: ", error));
      }
      console.log(chalk.green.inverse(location));
      console.log(chalk.green.inverse(forecastData));
    });
  });
} else {
  console.log(
    chalk.red.inverse("Error! No place was provided. Please try again.")
  );
}
/* =============================================================================== */
/* =============================================================================== */

// Calling the geoCode function from another file
// geoCode(address, (error, data) => {
//   if (error) {
//     return console.log("Error: ", error);
//   }
//   forecast(data.latitude, data.longitude, (error, forecastData) => {
//     if (error) {
//       return console.log("Error: ", error);
//     }
//     console.log(data.location);
//     console.log(forecastData);
//   });
// });

/* ===============================================================================
* Goal: Create a reusable function for getting the forecast (forecast: Previsión de clima)
*
* 1. Setup the "forecast" function in utils/forecast.js
* 2. Require the function in app.js and call it as shown bellow
* 3. The forecast function should have three potential call to callback:
*   - Low level error, pass string for error
*   - Coordinate error, pass string for error
*   - Success, pass forecast string for data (same format as from before)
================================================================================== */
// Challenge solution:
// Calling the forecast function from another file
// forecast(7.11861, -73.11611, (error, data) => {
//   if (error) {
//     console.log("Error: ", error);
//   } else {
//     console.log(data);
//   }
// });
/* =============================================================================== */

// /* ===============================================================================
// * Goal: Print a small forecast to the user
// *
// * 1. Print "It's currently 9 degrees out. It feels like 5 degrees out."
// * 2. Tests your work!
// ================================================================================== */
// // Challenge solution:
// // Weather API (weather stack)
// const apiKeyWeather = "db605507918100d736abf46e91bb1e4c";
// const urlWeather = `http://api.weatherstack.com/current?access_key=${apiKeyWeather}&query=${address}`;

// request({ url: urlWeather, json: true }, (error, response) => {
//   if (!error && !response.body.error) {
//     const data = response.body.current;
//     console.log(
//       `${data.weather_descriptions[0]}. It's currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
//     );
//   } else if (response.body.error) {
//     console.log(response.body.error.info);
//   } else {
//     console.log("Weather Error!");
//   }
// });
// /* =============================================================================== */

// /* ===============================================================================
// * Goal: Print the lat/long for Bucaramanga
// *
// * 1. Fire off a new request to the URL explored in the browser
// * 2. Have the request module parse it as JSON
// * 3. Print both the latitude and longitude to the terminal
// * 4. Tests your work!
// ================================================================================== */
// // Challenge solution:
// // Geolocation API (mapbox)
// const apiKeyGeo =
//   "pk.eyJ1Ijoicm9uYWxkdmVuZWdhc3AiLCJhIjoiY2tiOGJzaDdjMDJtbTJxbzE2M3Aya2k2YyJ9.FglvrgqERvNxmtIYNV-PcQ";
// const urlGeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//   address
// )}.json?limit=1&access_token=${apiKeyGeo}`;

// request(urlGeo, (error, response) => {
//   const data = JSON.parse(response.body).features[0];
//   if (!error && data !== undefined) {
//     console.log(`Longitude: ${data.center[0]}, Latitude: ${data.center[1]}`);
//   } else if (data === undefined) {
//     console.log("Unable to find location. Try another search.");
//   } else {
//     console.log("Geolocation Error!");
//   }
// });
// /* =============================================================================== */
