// ES5
var box5 = {
  color: "green",
  position: 1,
  clickMe: function () {
    var self = this;
    document.querySelector(".green").addEventListener("click", function () {
      console.log("this", this);
      console.log("self", self);
    });
  },
};
box5.clickMe();

// ES6
var box6 = {
  color: "green",
  position: 1,
  clickMe: function () {
    var self = this;
    document.querySelector(".green").addEventListener("click", () => {
      console.log("this", this);
      console.log("self", self);
    });
  },
};
box6.clickMe();

// ES5
function Person(name) {
  this.name = name;
}
Person.prototype.myFriends = function (friends) {
  console.log("this Person", this);
  var arr = friends.map(
    function (current) {
      console.log("this function", this);
      return this.name + " is friends with " + current;
    }.bind(this)
  );
  console.log(arr);
};

var friends = ["Bob", "Jane", "Mark"];
new Person("John").myFriends(friends);

// ES6
function Person(name) {
  this.name = name;
}
Person.prototype.myFriends = function (friends) {
  console.log("this Person", this);
  var arr = friends.map((current) => {
    console.log("this function", this);
    return `${this.name} is friends with ${current}`;
  });
  console.log(arr);
};

var friends = ["Bob", "Jane", "Mark"];
new Person("Mike").myFriends(friends);

// ES5
var john = ["John", 26];
// var name = john[0];
// var age = john[1];

//ES6
const [name, year] = ["Mark", 28];
console.log("name", name); // Result: "Mark"
console.log("year", year); // Result: 28

const obj = {
  firstName: "Ronald",
  lastName: "Venegas",
};

const { firstName, lastName } = obj;
console.log("firstName", firstName);
console.log("lastName", lastName);

function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log("age2", age2);
console.log("retirement", retirement);

// Select the boxes
const boxes = document.querySelectorAll(".box");
console.log(boxes);

// ES5
// var boxesArray = Array.prototype.slice.call(boxes);
// console.log(boxesArray);

// boxesArray.forEach(function (current) {
//   current.style.backgroundColor = "dodgerblue";
// });

// ES6
const boxesArray6 = Array.from(boxes);
boxesArray6.forEach(
  (current) => (current.style.backgroundColor = "dodgerblue")
);

for (const current of boxesArray6) {
  if (current.className.includes("blue")) {
    continue;
  }
  current.textContent = "I changed to blue!";
}

function addFourAges(a, b, c, d) {
  return a + b + c + d;
}

var sum = addFourAges(18, 30, 12, 21);
console.log(sum);

var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

const max3 = addFourAges(...ages);
console.log(max3);

// Maps ES6
const question = new Map();
question.set(
  "question",
  "What is the official name if the latest major JavaScript version?"
);
question.set(1, "ES5");
question.set(2, "ES6");
question.set(3, "ES2015");
question.set(4, "ES7");
question.set("correct", 3);
question.set(true, "Correct answer!");
question.set(false, "Wrong, please try again!");

console.log(question.get("question"));
console.log(question.size);

question.forEach((value, key) => {
  console.log(`This is ${key}, and it's set to ${value}`);
});

for (const [key, value] of question.entries()) {
  if (typeof key === "number") {
    console.log(`Answer ${key}: ${value}`);
  }
}

const ans = parseInt(prompt("Write the correct answer"));
console.log(question.get(ans === question.get("correct")));
