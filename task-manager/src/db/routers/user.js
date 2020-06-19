const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/users", async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/logoutAll", auth, async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/me", auth, async (req, res, next) => {
  res.send(req.user);
});

// router.get("/users/:id", async (req, res, next) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.patch("/users/me", auth, async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send("Error: Invalid updates!");
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/me", auth, async (req, res, next) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.delete("/users/me", auth, async (req, res, next) => {
//   const _id = req.user._id;
//   if (!mongoose.isValidObjectId(_id)) {
//     return res.status(404).send({ error: "The given user id is not correct!" });
//   }
//   try {
//     const user = await User.findByIdAndDelete(_id);
//     if (!user) {
//       return res.status(404).send({ error: "The given user was not found!" });
//     }
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
