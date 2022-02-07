const { Router } = require('express');

const { celebrate, Segments, Joi } = require('celebrate');
const AuthController = require('../controllers/AuthController');
const authConfig = require('../middlewares/authConfig');
const route = Router();

route.get('/', authConfig, AuthController.check).post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().messages({
        'any.required': `O campo {#label} é obrigatório. `,
      }),
      password: Joi.string().required().messages({
        'any.required': `O campo {#label} é obrigatório. `,
      }),
    }),
  }),
  AuthController.auth,
);

module.exports = route;
