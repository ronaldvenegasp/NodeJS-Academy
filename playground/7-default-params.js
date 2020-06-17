const greeter = (name = "User", age) => {
  console.log(`Hello ${name}`);
  console.log(`Age: ${age}`);
};
greeter("Ronald", 28);
greeter();
