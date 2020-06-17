console.log("Client side javascript file is loaded!");

/* ===============================================================================
* Goal: Use input value to get weather
*
* 1. Migrate fetch call into the submit callback
* 2. Use the search text as the address query string
* 3. Submit the form with a valid and invalid value to test
================================================================================== */
// Challenge solution:
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  /* ===============================================================================
* Goal: Fetch weather!
*
* 1. Setup a call to fecth weather for Bogotá
* 2. Get the parse JSON response
*   - If error property, print error
*   - If no error property, print location and forecast
* 3. Refresh the browser and test your work
================================================================================== */
  // Challenge solution:
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          return console.log(data.error);
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        // console.log(data.location);
        // console.log(data.forecast);
      });
    }
  );
  /* =============================================================================== */
});
/* =============================================================================== */
