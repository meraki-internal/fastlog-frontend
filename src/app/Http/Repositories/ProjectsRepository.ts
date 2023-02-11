import { CreateProjectProps } from '@dtos/Projects/CreateProjectProps';
import crypto from 'node:crypto';
import { PrismaClient, Project } from '@prisma/client'
import { UpdateProjectProps } from '@dtos/Projects/UpdateProjectProps';
const prisma = new PrismaClient();

class ProjectRepository {
  public async createProject({ userId, name, isDefault }: CreateProjectProps): Promise<Project | null> {
    const generateHash = crypto.randomBytes(20).toString('hex');
    let setIsDefault = isDefault;
    if (isDefault === false) {
      const findProjects = await this.listProjects(userId);
      if (findProjects.length === 0) {
        setIsDefault = true;
      }
    }
    return await prisma.project.create({
      data: {
        name,
        userId,
        hash: generateHash,
        default: setIsDefault
      }
    });

  }
  
  public async findProjectInDataUser(userId: string, projectHash: any ): Promise<Project | null>{
    return await prisma.project.findFirst({
      where:{
        userId,
        hash: projectHash
      }
    });
  }
  public async showProject(userId: string, id: string): Promise<Project | null> {
    return await prisma.project.findFirst({
      where: {
        id,
        userId
      }
    })
  }
  public async listProjects(userId: string): Promise<Project[] | null> {
    return await prisma.project.findMany({
      where: {
        userId
      }
    })
  }

  public async updateProject({ id, userId, name, isDefault}: UpdateProjectProps): Promise<Project | null> {
    return await prisma.project.update({
      where: {
        id
      },
      data: {
        name,
        default: isDefault,
        updatedAt: new Date(Date.now())
      }
    });
  }
  public async destroyProject(id: string): Promise<Project | null> {
    return await prisma.project.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(Date.now())
      }
    })
  }
}

export { ProjectRepository }