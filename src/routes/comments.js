const express = require('express');
const asyncify = require('express-asyncify');
const validation = require('../validators/comments.validate');
const { addErrorHandler } = require('../../utils/controllerUtils');
const commentsController = require('../../controllers/comments');

const api = asyncify(express.Router());


api.get(
  '/findAllComments/:id',
  validation.findAllComments,
  addErrorHandler(commentsController.findAllComments)
);

api.post(
  '/createComment',
  validation.createComment,
  addErrorHandler(commentsController.createComments)
);


module.exports = api;
