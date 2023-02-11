import { ProjectRepository } from "@repositories/ProjectsRepository";
import { NextFunction, Request, Response } from "express";

class ProjectsController {
  public async createProject(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.userId as string;
      const { name, isDefault = false } = request.body;

      const projectRepository = new ProjectRepository();

      const createProject = await projectRepository
        .createProject({ userId, name, isDefault });

      return response.status(200).json({
        message: "Projeto criado com sucesso.",
        status: true,
        data: createProject
      })

    } catch (err) {
      next(err);
    }
  }
  public async listProjects(request: Request, response: Response, next: NextFunction) {
    try {
      const { filter = "openeds" } = request.query;
      const userId = request.userId as string;

      const projectRepository = new ProjectRepository();

      const projects = await projectRepository.listProjects(userId);
      let filtered = [];
      if(filter === "all"){
        projects.map(project => filtered.push(project));
      }else if(filter === "deleteds"){
        projects.map(project => project.deletedAt !== null && filtered.push(project))
      }else if(filter === "openeds"){        
        projects.map(project => project.deletedAt === null && filtered.push(project))
      }

      return response.status(200).json(filtered)

    } catch (err) {
      next(err);
    }
  }
  public async showProject(request: Request, response: Response, next: NextFunction) {
    try {

      const { id } = request.params;
      const userId = request.userId as string;

      const projectRepository = new ProjectRepository();

      const project = await projectRepository.showProject(userId, id);

      return response.status(200).json(project);
    } catch (err) {
      next(err);
    }

  }
  public async updateProjects(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.userId as string;
      const { id } = request.params;
      const { name, isDefault = false } = request.body;

      const projectRepository = new ProjectRepository();

      const update = await projectRepository.updateProject({
        isDefault,
        id,
        name,
        userId
      });

      return response.status(200).json({
        message: "Projeto modificado com sucesso",
        status: true,
        data: update
      });

    } catch (err) {
      next(err);
    }

  }
  public async destroyProject(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const projectRepository = new ProjectRepository();

      await projectRepository.destroyProject(id);
      return response.status(200).json({
        message: "Projeto deletado com sucesso",
        status: true
      })

    } catch (err) {
      next(err);
    }

  }

}

export default new ProjectsController();