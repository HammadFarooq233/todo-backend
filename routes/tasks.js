const express = require("express");
const router = express.Router();

const { validateTaskRequest } = require("../utils/validationSchemas");
const { addTask, updateTask, deleteTask } = require("../services/task");

router.post("/", async (req, res, next) => {
  //   validate request body
  const { error } = validateTaskRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = req.body;
  const user = req.user;

  try {
    const result = await addTask({ ...task, user: user._id });
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res, next) => {
  const taskId = req.params.id;
  const task = req.body;

  try {
    const result = await updateTask(taskId, task);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res, next) => {
  const taskId = req.params.id;
  try {
    const result = await deleteTask(taskId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
