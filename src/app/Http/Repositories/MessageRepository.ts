import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

class MessageRepository{
  public async listMessages({channelID, projectID}){
    
    return await prisma.message.findMany({
      where:{
        channelID,
        projectID
      }
    });
    
  }
  public async createMessage({ name,
  description,
  channelID,
  icon,
  message,
  projectID,
                             }){
    
    return await prisma.message.create({
      data:{
        name,
        description,
        channelID,
        icon,
        message,
        projectID
      }
    });
  }
}

export { MessageRepository };