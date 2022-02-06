const {Router} = require('express');

const { celebrate, Segments, Joi, isCelebrateError  } = require('celebrate');
const AuthController = require('../controllers/AuthController');
const messages = require('../messages/symbol')

const route =Router();



function customErrors() {
    const fieldNames = {
        email: 'endereço de e-mail',
        password: 'o campo de senha'
    };

    function replaceFieldNames(message) {
        const keys = Object.keys(fieldNames);
        let msg = message;
        keys.forEach((k) => {
            const regex = new RegExp(`\"${k}\"`, 'gi');
            msg = msg.replace(regex, String(fieldNames[k]));
        });
        return msg;
    }

    return (error, req, res, next) => {
        if (!isCelebrateError(error)) {
            return next(error);
        }
        // is a celebrate error
        const result = {
            error: 'VALIDATION_ERROR',
            messages: [],
        };
        for (const [segment, joiError] of error.details.entries()) {
            result.messages = joiError.details.map((err) => {
                return replaceFieldNames(err.message);
            });
        }
        return res.status(400).json(result);
    };
}

const ExampleValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
}, {
    abortEarly: false,
    messages: messages,
});



route.post(
  '/',
  ExampleValidation,
  AuthController.auth,
);
route.use(customErrors());

module.exports = route;
