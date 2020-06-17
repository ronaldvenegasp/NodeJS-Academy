// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve([7, 4, 1]);
//     reject("Things went wrong!");
//   }, 2000);
// });

// doWorkPromise
//   .then((response) => {
//     console.log("Success!", response);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// add(1, 2)
//   .then((sum) => {
//     console.log("sum1", sum);
//     add(sum, 3)
//       .then((sum) => {
//         console.log("sum2", sum);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   })
// .catch((error) => {
//   console.error(error);
// });

add(1, 3)
  .then((sum) => {
    console.log("sum1", sum);
    return add(sum, 5);
  })
  .then((sum) => {
    console.log("sum2", sum);
    return add(sum, 3);
  })
  .then((sum) => {
    console.log("sum3", sum);
  })
  .catch((error) => {
    console.error(error);
  });
