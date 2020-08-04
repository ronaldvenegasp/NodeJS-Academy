const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/Task");
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
} = require("./fixtures/db");

beforeEach(setupDatabase);

afterEach(() => {});

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "From my test",
    })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should fetch user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test("Should NOT delete other users task", async () => {
  const response = await request(app)
    .delete(`/task/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});

/* ==================== Other Task Tests ====================  */
// Should NOT create task with invalid description/completed
// Should NOT update task with invalid description/completed
// Should delete user task
// Should NOT delete task if unauthenticated
// Should NOT update other users tasks
// Should fetch user task by id
// Should NOT fetch user task by id if unauthenticated
// Should NOT fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incompleted tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks
