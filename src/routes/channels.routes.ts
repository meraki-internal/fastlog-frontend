import { Router } from "express";

import channelController from '@controllers/ChannelController';
import { AuthenticateMiddleware } from '@middlewares/AuthenticateMiddleware'
import { ProjectMiddleware } from "@middlewares/ProjectMiddleware";

const channelsRoutes = Router();

channelsRoutes
  .get("/", AuthenticateMiddleware, ProjectMiddleware, channelController.listChannles)
  .post("/", AuthenticateMiddleware, ProjectMiddleware,channelController.createChannel)
  .put("/:channelID", AuthenticateMiddleware, ProjectMiddleware,channelController.updateChannel)
  .delete("/:channelID", AuthenticateMiddleware, ProjectMiddleware,channelController.destroyChannel)

export { channelsRoutes }