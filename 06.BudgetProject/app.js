/* ======================================================================= */
// The Budget Controller
var budgetController = (function () {
  // Expenses function constructor
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  // Incomes function constructor
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Store the incomes and expenses
  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  // Calculate total function
  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (currentValue) {
      sum += currentValue.value;
    });
    data.totals[type] = sum;
  };

  return {
    addItem: function (type, description, value) {
      var id, newItem;

      // Create new ID
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // Create new item
      if (type === "exp") {
        newItem = new Expense(id, description, value);
      } else if (type === "inc") {
        newItem = new Income(id, description, value);
      }

      // Push it into our data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },

    deleteItem: function (type, id) {
      var ids, index;

      ids = data.allItems[type].map(function (currentElement) {
        return currentElement.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function () {
      // Calculate total income and expenses
      calculateTotal("inc");
      calculateTotal("exp");

      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalIncome: data.totals.inc,
        totalExpense: data.totals.exp,
        percentage: data.percentage,
      };
    },

    calculatePercentages: function () {
      data.allItems.exp.forEach(function (current) {
        current.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPercentages = data.allItems.exp.map(function (current) {
        return current.getPercentage();
      });
      return allPercentages;
    },

    testing: function () {
      console.log(data);
    },
  };
})();

/* ======================================================================= */
// The UI Controller
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomesLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  formatNumber = function (num, type) {
    var numSplit, int, decimal;
    num = Math.abs(num);
    num = num.toFixed(2);
    numSplit = num.split(".");
    int = numSplit[0];
    decimal = numSplit[1];

    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
    }

    return (type === "exp" ? "-" : "+") + " " + int + "." + decimal;
  };

  var nodeListForEach = function (list, callback) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    getDOMstrings: function () {
      return DOMstrings;
    },

    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either 'inc' or 'exp'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;

      // Create HTML string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%">' +
          '<div class="item__description">%description%</div>' +
          '<div class="right clearfix">' +
          '<div class="item__value">%value%</div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
          "</div>" +
          "</div>" +
          "</div>";
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="exp-%id%">' +
          '<div class="item__description">%description%</div>' +
          '<div class="right clearfix">' +
          '<div class="item__value">%value%</div>' +
          '<div class="item__percentage"></div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
          "</div>" +
          "</div>";
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: function (selectorId) {
      var element;
      element = document.getElementById(selectorId);
      element.parentNode.removeChild(element);
    },

    clearFields: function () {
      var fields, fieldsArray;

      // Recieve a list of fields
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      // Convert the list of fields to an array
      fieldsArray = Array.prototype.slice.call(fields);
      fields.forEach(function (currentElement, index, array) {
        currentElement.value = "";
      });
      fieldsArray[0].focus();
    },

    displayBudget: function (obj) {
      var type;
      obj.budget > 0 ? (type = "inc") : (type = "exp");
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(
        DOMstrings.incomesLabel
      ).textContent = formatNumber(obj.totalIncome, "inc");
      document.querySelector(
        DOMstrings.expensesLabel
      ).textContent = formatNumber(obj.totalExpense, "exp");

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },

    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(
        DOMstrings.expensesPercentageLabel
      );

      nodeListForEach(fields, function (current, index) {
        percentages[index] > 0
          ? (current.textContent = percentages[index] + "%")
          : (current.textContent = "---");
      });
    },

    displayMonth: function () {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth();
      document.querySelector(DOMstrings.dateLabel).textContent =
        months[month] + " " + year;
    },

    changeType: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          "," +
          DOMstrings.inputDescription +
          "," +
          DOMstrings.inputValue
      );

      nodeListForEach(fields, function (current) {
        current.classList.toggle("red-focus");
      });

      document.querySelector(DOMstrings.inputButton).classList.toggle("red");
    },
  };
})();

/* ======================================================================= */
// The Global App Controller
var appController = (function (budgetCtrl, UICtrl) {
  // Initialization function
  var setupEventListeners = function () {
    var DOMstrings = UICtrl.getDOMstrings();

    document
      .querySelector(DOMstrings.inputButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOMstrings.container)
      .addEventListener("click", ctrlDeleteItem);

    document
      .querySelector(DOMstrings.inputType)
      .addEventListener("change", UIController.changeType);
  };

  // Add item function
  var ctrlAddItem = function () {
    var input, newItem;

    // 1. Get the field input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UIController.addListItem(newItem, input.type);

      // 4. Clear the fields
      UIController.clearFields();

      // 5. Calculate and update budget
      updateBudget();

      // 6. Calculate and update the percentages
      updatePercentages();
    }
  };

  // Delete item function
  var ctrlDeleteItem = function (event) {
    var itemId, splitId, type, id;
    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemId) {
      splitId = itemId.split("-"); // Returns an array ["type", "id"]
      type = splitId[0];
      id = parseInt(splitId[1]);

      // 1. Delete the item from the data structure
      budgetController.deleteItem(type, id);

      // 2. Delete the item from the UI
      UIController.deleteListItem(itemId);

      // 3. Update and show the new budget
      updateBudget();

      // 4. Calculate and update the percentages
      updatePercentages();
    }
  };

  // Update the percentage badges
  var updatePercentages = function () {
    // 1. Calculate the percentages
    budgetController.calculatePercentages();

    // 2. Read percentages from the budget controller
    var percentages = budgetController.getPercentages();

    // 3. Update the UI with the new percentage
    UIController.displayPercentages(percentages);
  };

  // Update the budget function
  var updateBudget = function () {
    // 1. Calculate the budget
    budgetController.calculateBudget();

    // 2. Return the budget
    var budget = budgetController.getBudget();

    // 3. Display the budget on the UI
    UIController.displayBudget(budget);
  };

  return {
    init: function () {
      console.log("The application has started!");
      UIController.displayMonth();
      UIController.displayBudget({
        budget: 0,
        totalIncome: 0,
        totalExpense: 0,
        percentage: 0,
      });
      setupEventListeners();
    },
  };
})(budgetController, UIController);

/* ======================================================================= */
// Initialize the application
appController.init();
