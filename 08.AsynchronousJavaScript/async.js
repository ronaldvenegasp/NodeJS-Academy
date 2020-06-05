// function gerRecepie() {
//   setTimeout(() => {
//     const recepieId = [523, 883, 432, 974];
//     console.log(recepieId);

//     setTimeout(
//       (id) => {
//         const recepie = {
//           title: "Fresh tomato pasta",
//           publisher: "Ronald Venegas",
//         };
//         console.log(`${id}: ${recepie.title}`);

//         setTimeout(
//           (publisher) => {
//             const recepie2 = {
//               title: "Italian pizza",
//               publisher: "Ronald Venegas",
//             };
//             console.log(recepie);
//           },
//           1500,
//           recepie.publisher
//         );
//       },
//       1500,
//       recepieId[2]
//     );
//   }, 1500);
// }
// gerRecepie();

// fetch("https://www.metaweather.com/api/location/2487956");

function getWeather(woeid) {
  const url = `https://www.metaweather.com/api/location/${woeid}/`;
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then((result) => {
      //   console.log(result);
      return result.json();
    })
    .then((data) => {
      //   console.log(data);
      const today = data.contents.consolidated_weather;
      //   console.log(
      //     `Temperatures in ${data.contents.title} stay between ${today.min_temp} and ${today.max_temp}`
      //   );
    })
    .catch((error) => console.log(error));
}
getWeather(2487956);

async function getWeatherAW(woeid) {
  const url = `https://www.metaweather.com/api/location/${woeid}/`;
  const result = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
  );
  const data = await result.json();
  console.log(data.contents);
}
getWeatherAW(2487956);
