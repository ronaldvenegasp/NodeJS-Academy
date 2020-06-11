const square = (x) => x * x;
console.log(square(3));

// Function
const event = {
  name: "Birthday party",
  guestList: ["Ronald", "Claudia", "Lizeth"],
  printGuestList: function () {
    const self = this;
    console.log("Guest list for " + this.name);
    this.guestList.forEach(function (guest) {
      console.log(guest + " is attending " + self.name);
    });
  },
};
event.printGuestList();

// Arrow function
const eventArrow = {
  name: "Birthday party",
  guestList: ["Ronald", "Claudia", "Lizeth"],
  printGuestList: () => {
    console.log("Guest list for " + eventArrow.name);
    eventArrow.guestList.forEach((guest) => {
      console.log(`${guest} is attending ${event.name}`);
    });
  },
};
eventArrow.printGuestList();

// Function alternative
const eventAlternative = {
  name: "Birthday party",
  printGuestList() {
    console.log("Guest list for " + this.name);
  },
};
eventAlternative.printGuestList();
