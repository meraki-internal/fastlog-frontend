
import { MiddlewareCreateUser } from "@middlewares/routes/User/CreateUser";
import messageController from "@controllers/MessageController";

const { Router } = require('express');

const messageRoutes = Router();

messageRoutes
  .get("/", messageController.listMessages)
  .post("/", messageController.createMessage);

export { messageRoutes };
