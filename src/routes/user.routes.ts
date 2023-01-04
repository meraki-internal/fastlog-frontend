
import userController from "../app/Http/controllers/UserController";

const { Router } = require('express');

const userRoutes = Router();

userRoutes
    .post("/", userController.store);

export { userRoutes };
