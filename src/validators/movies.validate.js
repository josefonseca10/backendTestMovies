const { Joi } = require('express-validation');
const { badRequest } = require('@hapi/boom');

module.exports.findAllMovies = async (req, res, next) => {
  const bodySchema = Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
    id: Joi.number(),
    name: Joi.string(),
    description: Joi.string(),
  });
  const { error: bodyError } = bodySchema.validate(req.query);
  if (bodyError) {
    const errorMessage = bodyError.details
      .map((detail) => detail.message.replace(/"/g, ''))
      .join(', ');
    throw badRequest(errorMessage);
  }
  return next();
};
  
module.exports.createMovie = async (req, res, next) => {
  const bodySchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.binary().required(),
    description: Joi.string().required(),
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
  
module.exports.updateMovie = async (req, res, next) => {
  const paramsSchema = Joi.number().required();
  const { error: paramsError } = paramsSchema.validate(req.params.id);
  if (paramsError) {
    const errorMessage = paramsError.details
      .map((detail) => detail.message.replace(/"/g, ''))
      .join(', ');
    throw badRequest(errorMessage);
  }
  const bodySchema = Joi.object({
    name: Joi.string(),
    image: Joi.binary(),
    description: Joi.string(),
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

module.exports.deleteMovie = async (req, res, next) => {
  const paramsSchema = Joi.number().required()
  const { error: paramsError } = paramsSchema.validate(req.params.id);
  if (paramsError) {
    const errorMessage = paramsError.details
      .map((detail) => detail.message.replace(/"/g, ''))
      .join(', ');
    throw badRequest(errorMessage);
  }
  return next();
};