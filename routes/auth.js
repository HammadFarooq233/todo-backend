const express = require("express");
const router = express.Router();

const { validateLoginRequest } = require("../utils/validationSchemas");
const { login } = require("../services/user");

router.post("/token", async (req, res) => {
  //   validate request body
  const { error } = validateLoginRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = req.body;
  try {
    const result = await login(user.email, user.password);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
