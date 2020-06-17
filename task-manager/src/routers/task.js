const express = require("express");
const mongoose = require("mongoose");
const Task = require("./../db/models/Task");
const router = new express.Router();

router.post("/tasks", async (req, res, next) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", async (req, res, next) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send("Error: Invalid updates!");
  }

  const _id = req.params.id;
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send({ error: "The given task id is not correct!" });
  }
  const body = req.body;
  try {
    const task = await Task.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send({ error: "The given task was not found!" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", async (req, res, next) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send({ error: "The given task id is not correct!" });
  }
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send({ error: "The given task was not found!" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
