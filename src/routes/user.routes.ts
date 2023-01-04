
import { MiddlewareCreateUser } from "@middlewares/routes/User/CreateUser";
import userController from "@controllers/UserController";

const { Router } = require('express');

const userRoutes = Router();

userRoutes
  .post("/", MiddlewareCreateUser, userController.store);

export { userRoutes };
