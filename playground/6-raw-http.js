const http = require("http");

const address = "Bogotá";
const apiKeyGeo =
  "pk.eyJ1Ijoicm9uYWxkdmVuZWdhc3AiLCJhIjoiY2tiOGJzaDdjMDJtbTJxbzE2M3Aya2k2YyJ9.FglvrgqERvNxmtIYNV-PcQ";
const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  address
)}.json?limit=1&access_token=${apiKeyGeo}`;

const request = http.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });
  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
