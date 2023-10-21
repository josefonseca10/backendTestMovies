const express = require('express');
const asyncify = require('express-asyncify');
const validation = require('../validators/movies.validate');
const { addErrorHandler } = require('../../utils/controllerUtils');
const moviesController = require('../../controllers/movies');

const api = asyncify(express.Router());


api.get(
  '/findAllMovies',
  validation.findAllMovies,
  addErrorHandler(moviesController.findAllMovies)
);

api.post(
  '/createMovie',
  validation.createMovie,
  addErrorHandler(moviesController.createMovie)
);

api.put(
  '/updateMovie/:id',
  validation.updateMovie,
  addErrorHandler(moviesController.updateMovie)
);

api.delete(
  '/deleteMovie/:id',
  validation.deleteMovie,
  addErrorHandler(moviesController.deleteMovie)
);


module.exports = api;
