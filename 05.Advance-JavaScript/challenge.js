/* ========== BASIC SOLUTION ========== */
// This is a IIFE with a private context
// (function () {
//   // Function constructor
//   function Question(question, answers, correctAnswer) {
//     this.question = question;
//     this.answers = answers;
//     this.correctAnswer = correctAnswer;
//   }

//   Question.prototype.displayQuestion = function () {
//     console.log(this.question);
//     this.answers.forEach((answer, index) => {
//       console.log(index + ": " + answer);
//     });
//   };

//   Question.prototype.checkAnswer = function (userAnswer) {
//     if (userAnswer === this.correctAnswer) {
//       console.log("Correct answer!");
//     } else {
//       console.log("Incorrect answer!");
//     }
//   };

//   // Questions
//   var firstQuestion = new Question(
//     "Is JavaScrip the coolest programming language in the world?",
//     ["Yes", "No"],
//     0
//   );
//   var secondQuestion = new Question(
//     "What is the name of this course's teacher?",
//     ["John", "Michael", "Jonas"],
//     2
//   );
//   var thirdQuestion = new Question(
//     "Is your name Ronald Guiovanni?",
//     ["Yes", "No"],
//     1
//   );

//   // Array of questions
//   var questionsArr = [firstQuestion, secondQuestion, thirdQuestion];

//   // Select a random question
//   var question = questionsArr[Math.floor(Math.random() * 3)];

//   // Show the question in the console
//   question.displayQuestion();

//   // Receive the answer form the user
//   var answer = parseInt(prompt("Please select the correct answer."));

//   // Compare the user answer with the correct answer
//   question.checkAnswer(answer);
// })();

/* ===================================== */
/* ===================================== */
/* ===================================== */
/* ===================================== */
/* ===================================== */

/* ========== EXPERT SOLUTION ========== */
(function () {
  // Function constructor
  function Question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.displayQuestion = function () {
    console.log(this.question);
    this.answers.forEach((answer, index) => {
      console.log(index + ": " + answer);
    });
  };

  Question.prototype.checkAnswer = function (userAnswer, callback) {
    var score;
    if (userAnswer === this.correctAnswer) {
      console.log("Correct answer!");
      score = callback(true);
    } else {
      console.log("Incorrect answer!");
      score = callback(false);
    }
    this.displayScore(score);
  };

  // Display the score in the console
  Question.prototype.displayScore = function (score) {
    console.log("-------------------------");
    console.log("Your current score is: " + score);
    console.log("-------------------------");
  };

  // Questions
  var firstQuestion = new Question(
    "Is JavaScrip the coolest programming language in the world?",
    ["Yes", "No"],
    0
  );
  var secondQuestion = new Question(
    "What is the name of this course's teacher?",
    ["John", "Michael", "Jonas"],
    2
  );
  var thirdQuestion = new Question(
    "Is your name Ronald Guiovanni?",
    ["Yes", "No"],
    0
  );

  // Array of questions
  var questionsArr = [firstQuestion, secondQuestion, thirdQuestion];

  // Keep the score of the user when the answer is correct
  function score() {
    var userScore = 0;
    return function (correct) {
      if (correct) {
        userScore++;
      }
      return userScore;
    };
  }
  var keepScore = score();

  // Function to display another random question
  function nextQuestion() {
    // Select a random question
    var question = questionsArr[Math.floor(Math.random() * 3)];

    // Show the question in the console
    question.displayQuestion();

    // Receive the answer form the user
    var answer = prompt("Please select the correct answer.");

    if (answer !== "exit") {
      // Compare the user answer with the correct answer
      question.checkAnswer(parseInt(answer), keepScore);
      nextQuestion();
    }
  }

  nextQuestion();
})();
