const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("Numbers must be non-negative");
      }
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  const sum = await add(1, 99);
  console.log("sum:", sum);
  const sum2 = await add(sum, 50);
  console.log("sum2:", sum2);
  const sum3 = await add(sum, sum2);
  return sum3;
};

doWork()
  .then((response) => {
    console.log("result:", response);
  })
  .catch((error) => {
    console.error("error:", error);
  });
