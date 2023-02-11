import { Router } from "express";

import projectsController from '@controllers/ProjectsController';
import { AuthenticateMiddleware } from '@middlewares/AuthenticateMiddleware'

const projectRoutes = Router();

projectRoutes
  .get("/", AuthenticateMiddleware, projectsController.listProjects)
  .get("/:id", AuthenticateMiddleware, projectsController.showProject)
  .post("/", AuthenticateMiddleware, projectsController.createProject)
  .put("/:id", AuthenticateMiddleware, projectsController.updateProjects)
  .delete("/:id", AuthenticateMiddleware, projectsController.destroyProject)

export { projectRoutes }