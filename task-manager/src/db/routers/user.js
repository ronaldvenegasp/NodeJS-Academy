const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = new express.Router();

// Create a new user
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

// Login with a username and password
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

// User logout
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

// User logout from all places
router.post("/users/logoutAll", auth, async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get the profile information
router.get("/users/me", auth, async (req, res, next) => {
  res.send(req.user);
});

// Update user information
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

// Delete a user
router.delete("/users/me", auth, async (req, res, next) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Upload a profile image
const upload = multer({
  limits: {
    fileSize: 1000000, // This value is 1MB in bytes
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return callback(new Error("Please upload a image file"));
    }
    callback(undefined, true);
    // callback(new Error("File must be an image"), false); // First way: Send and error
    // callback(undefined, true); // Second way: No error (first argument) and accept the file (second argument)
    // callback(undefined, false); // Third way: No error and reject the file
  },
});
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({
          width: 250,
          height: 250,
        })
        .png()
        .toBuffer();
      req.user.avatar = buffer;
      await req.user.save();
      res
        .status(200)
        .send({ message: "Profile picture successfully uploaded!" });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Delete profile image
router.delete("/users/me/avatar", auth, async (req, res, next) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send({ message: "Profile picture successfully deleted!" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Fetching the avatar
router.get("/users/:id/avatar", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error("");
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
