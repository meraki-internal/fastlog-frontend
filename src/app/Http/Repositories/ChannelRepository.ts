import { RequestCreateChannelProps } from "@dtos/Channel/CreateChannel";
import { PrismaClient } from "@prisma/client"
import { ListChannelsRequestProps } from "@dtos/Channel/ListChannelsRequestProps";
import { UpdateChanellRequestProps } from "@dtos/Channel/UpdateChanellRequestProps";
const prisma = new PrismaClient();
class ChannelRepository {
  public async createChannel({
    name,
    type,
    projectId,
    userId,
  }: RequestCreateChannelProps) {
    
    return prisma.channel.create({
      data: {
        name,
        type,
        projectId,
        userId,
      }
    })
  }
  
  public async listChannels({projectId,userId}: ListChannelsRequestProps):Promise<any>{
    return await prisma.channel.findMany({
      where:{
        projectId,
        userId
      }
    })
  }
  
  public async updateChannel({type,id,name,active}: UpdateChanellRequestProps){
    return await prisma.channel.update({
      where: {
        id
      },
      data:{
        type,
        name,
        active
      }
    });
  }
  
  public async destroyChannel(id: string):Promise<any>{
    return await prisma.channel.update({
      where:{
        id
      },
      data:{
        active: false,
        deletedAt: new Date(Date.now())
      }
    })
  }
}

export { ChannelRepository };