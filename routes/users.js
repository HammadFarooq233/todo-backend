const express = require("express");
const router = express.Router();

const { validateRegistrationRequest } = require("../utils/validationSchemas");
const { register } = require("../services/user");
const { getTasksByUser } = require("../services/task");

const auth = require("../middlewares/auth");

router.post("/", async (req, res, next) => {
  //   validate request body
  const { error } = validateRegistrationRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = req.body;
  try {
    const result = await register(user);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/:id/tasks", auth, async (req, res, next) => {
  const userId = req.params.id;
  try {
    const result = await getTasksByUser(userId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
