// const request = require("request"); // Request module has been deprecated
const request = require("postman-request");

// Weather API Key
const apiKey = "db605507918100d736abf46e91bb1e4c";

const forecast = (latitude, longitude, callback) => {
  // Weather API (weather stack)
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    const data = body.current;
    if (!error && !body.error) {
      //   callback(undefined, {
      //     temperature: data.temperature,
      //     feelslike: data.feelslike,
      //     weather_descriptions: data.weather_descriptions,
      //   });
      callback(
        undefined,
        `${data.weather_descriptions[0]}. It's currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
      );
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback("Weather Error!", error);
    }
  });
};

module.exports = forecast;
