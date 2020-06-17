const request = require("postman-request");

// Geolocation API Key
const apiKey =
  "pk.eyJ1Ijoicm9uYWxkdmVuZWdhc3AiLCJhIjoiY2tiOGJzaDdjMDJtbTJxbzE2M3Aya2k2YyJ9.FglvrgqERvNxmtIYNV-PcQ";

// GeoCode Function to communicate the two requests
// Once we get the latitude and longitude values,
// We pass them to the weather request
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=${apiKey}`;

  request({ url }, (error, { body }) => {
    const data = JSON.parse(body).features[0];
    if (!error && data !== undefined) {
      callback(undefined, {
        longitude: data.center[0],
        latitude: data.center[1],
        location: data.place_name,
      });
    } else if (data === undefined) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback("Geolocation Error!", error);
    }
  });
};

module.exports = geoCode;
