import { Exception } from "@exceptions/Exception";
import { ValidateRouter } from "@middlewares/routes/ValidateRouter";
import Joi from "joi";

const SchemaRouter = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
});

function MiddlewareCreateUser(request, response, next) {
  if (ValidateRouter(SchemaRouter, request.body) === true) {
    next();
  }
}

export { MiddlewareCreateUser }