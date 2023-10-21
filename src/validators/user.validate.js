const { Joi } = require('express-validation');
const { badRequest } = require('@hapi/boom');

module.exports.verifyCode = async (req, res, next) => {
  const bodySchema = Joi.object({
    code: Joi.string().required()
  });
  const { error: bodyError } = bodySchema.validate(req.body);
  if (bodyError) {
    const errorMessage = bodyError.details
      .map((detail) => detail.message.replace(/"/g, ''))
      .join(', ');
    throw badRequest(errorMessage);
  }
  return next();
};

module.exports.signing = async (req, res, next) => {
  const bodySchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error: bodyError } = bodySchema.validate(req.body);
  if (bodyError) {
    const errorMessage = bodyError.details
      .map((detail) => detail.message.replace(/"/g, ''))
      .join(', ');
    throw badRequest(errorMessage);
  }
  return next();
};

module.exports.register = async (req, res, next) => {
  const bodySchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });
  const { error: bodyError } = bodySchema.validate(req.body);
  if (bodyError) {
    const errorMessage = bodyError.details
      .map((detail) => detail.message.replace(/"/g, ''))
      .join(', ');
    throw badRequest(errorMessage);
  }
  return next();
};
