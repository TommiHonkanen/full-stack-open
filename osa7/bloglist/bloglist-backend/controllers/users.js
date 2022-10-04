const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username === undefined || password === undefined) {
    return response.status(400).json({ error: "username or password missing" });
  }

  if (username.length < 3) {
    return response
      .status(400)
      .json({ error: "username has to be at least 3 characters" });
  }

  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "password has to be at least 3 characters" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (_request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
