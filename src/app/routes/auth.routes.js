const { Router } = require('express');

const { celebrate, Segments, Joi } = require('celebrate');
const AuthController = require('../controllers/AuthController');

const route = Router();

route.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  AuthController.auth,
);

module.exports = route;
