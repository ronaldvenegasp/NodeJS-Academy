// setTimeout(() => {
//   console.log("Two seconds are up");
// }, 2000);

// const names = ["Ronald", "Claudia", "Lizeth", "Jess", "Jane"];
// const shortNames = names.filter((name) => name.length > 4);
// console.log(shortNames);

// const geoCode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longitude: 0,
//     };
//     callback(data);
//   }, 2000);
// };

// geoCode("Bogota", (data) => {
//   console.log(data);
// });

/* ===============================================================================
 * Goal: Mess around with the callback pattern
 *
 * 1. Define an add function that accepts the correct arguments
 * 2. Use setTimeout to simulate a 2 second delay
 * 3. After 2 seconds are up, call the callback function with the sum
 * 4. Tests your work!
================================================================================== */
// Challenge solution:
const add = (num1, num2, callback) => {
  setTimeout(() => {
    callback(num1 + num2);
  }, 2000);
};

add(1, 4, (sum) => {
  console.log(sum);
});
/* =============================================================================== */
