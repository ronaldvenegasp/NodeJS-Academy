// Object property shorthand
const name = "Ronald";
const age = 28;

const user = {
  name,
  age,
  location: "Bogotá",
};
// console.log(user);

// Object destructuring
const product = {
  label: "Red notebook",
  price: 3,
  stock: 201,
  salePrice: undefined,
};

const {
  label: productLabel,
  price,
  stock,
  salePrice = 3.5,
  rating = 5,
} = product;
// console.log(productLabel);
// console.log(price);
// console.log(salePrice);
// console.log(rating);

const transaction = (type, { label, stock = 0 } = {}) => {
  console.log(type);
  console.log(label);
  console.log(stock);
};
transaction("order");
