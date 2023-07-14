const Joi = require("joi");

function validateRegistrationRequest(body) {
  const schema = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(12).required(),
  });

  return schema.validate(body);
}

function validateLoginRequest(body) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(12).required(),
  });

  return schema.validate(body);
}

function validateTaskRequest(body) {
  const schema = Joi.object({
    description: Joi.string().required(),
  });

  return schema.validate(body);
}

module.exports = {
  validateRegistrationRequest,
  validateLoginRequest,
  validateTaskRequest,
};
