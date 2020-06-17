console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  async function getWeatherData(location) {
    try {
      let response = await fetch(
        `http://localhost:3000/weather?address=${location}`
      );
      let data = await response.json();
      if (data.error) {
        messageOne.textContent = data.error;
        return console.error(data.error);
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    } catch (error) {
      console.error(error);
    }
  }
  getWeatherData(search.value);
});
