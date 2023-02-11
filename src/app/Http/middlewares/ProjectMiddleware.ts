import { NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken';
import { ProjectRepository } from "@repositories/ProjectsRepository";
import { Exception } from "@exceptions/Exception";

export async function ProjectMiddleware(request: Request, response: Response, next: NextFunction) {
  const projectHash = request.headers['x-project-hash'];
  
  if(!projectHash){
    return response.status(401).json({
      message:"Você precisa informar o projeto designado.",
      status: false,
      statusCode: 401
    });

  }
  const userId = request.userId;
  
  const projectRepository = new ProjectRepository();
  const findProjectInDataUser = await projectRepository.findProjectInDataUser(userId, projectHash);
  if(!findProjectInDataUser){
    return response.status(401).json({
      message:"Você não tem permissão para acessar essa funcionalidade.",
      status: false,
      statusCode: 401
    });
  }
  
  request.projectId = findProjectInDataUser.id;
  next();
};
