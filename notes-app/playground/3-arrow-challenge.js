/* ===============================================================================
 * Challenge: Create method to get incomplete tasks
 *
 * 1. Define getTaskToDo method
 * 2. Use filter to return just the incompleted tasks (arrow function)
 * 3. Tests your work by running the script
================================================================================== */
// Challenge solution:
const tasks = {
  tasks: [
    {
      text: "Grocery shopping",
      completed: true,
    },
    {
      text: "Clean yard",
      completed: false,
    },
    {
      text: "Film course",
      completed: false,
    },
  ],
  getTaskToDo() {
    return this.tasks.filter((task) => task.completed === false);
  },
};

console.log(tasks.getTaskToDo());
/* =============================================================================== */
