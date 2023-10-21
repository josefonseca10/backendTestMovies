const express = require('express');
const asyncify = require('express-asyncify');
const validation = require('../validators/user.validate');
const { addErrorHandler } = require('../../utils/controllerUtils');
const usersController = require('../../controllers/user');
const api = asyncify(express.Router());

api.post('/login',
    validation.signing,
    addErrorHandler(usersController.login))

api.post('/register',
    validation.register,
    addErrorHandler(usersController.register)
    )

module.exports = api;
