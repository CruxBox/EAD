'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticate');


api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update', md_auth.ensureAuth, UserController.updateUser);

module.exports = api;