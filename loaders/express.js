const express = require("express");
const cors = require("cors");

const authRouter = require("../routes/auth");
const usersRouter = require("../routes/users");
const tasksRouter = require("../routes/tasks");
const auth = require("../middlewares/auth");

async function expressLoader(app) {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });

  app.use(express.json());

  app.use(cors());
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/tasks", auth, tasksRouter);
  app.get("/", (req, res) => res.send("Hello World..."));
}

module.exports = expressLoader;
