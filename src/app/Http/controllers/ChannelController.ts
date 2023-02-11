import { NextFunction, Request, Response } from "express";
import { ChannelRepository } from "@repositories/ChannelRepository";

class ChannelController {
  
  public async listChannles(request: Request, response: Response, next:NextFunction){
    try{
      const projectId = request.projectId as string;
      const userId = request.userId as string;
      
      const channelRepository = new ChannelRepository();
      const listChannels = await channelRepository.listChannels({projectId, userId});

      return response.status(200).json({
        message: "Listagem de canais do projeto",
        status: true,
        data: listChannels
      });
    }catch(err){
      next(err);
    }
  }
  public async createChannel(request: Request, response: Response, next: NextFunction){
    try{
      const projectId = request.projectId;
      const userId = request.userId;
      
      console.log({projectId, userId});
      const { name, type } = request.body;
      const channelRepository = new ChannelRepository();
      const create = await channelRepository.createChannel({
        projectId,
        userId,
        name,
        type
      });
      
      return response.status(200).json({
        message: "Você criou um novo cannal para esse projeto.",
        status: true,
        data: create
      })
    }catch(err){
      console.error(err);
      next(err);
    }
  }
  public async updateChannel(request: Request, response: Response, next: NextFunction){
    try{
      const {channelID} = request.params;
      const projectId = request.projectId;
      const userId = request.userId;
      const { name, type = "REST", active} = request.body;
      
      const channelRepository = new ChannelRepository();
      const update = await channelRepository.updateChannel({
        id: channelID,
        projectId,
        userId,
        name,
        type,
        active
      })

      return response.status(200).json({
        message: "Você editado com sucesso.",
        status: true
      })
    }catch(err){
      next(err);
    }
  }
  public async destroyChannel(request: Request, response: Response, next: NextFunction){
    try{
      const {channelID} = request.params;
      const channelRepository = new ChannelRepository();
      await channelRepository.destroyChannel(channelID);

      return response.status(200).json({
        message: "Canal excluído com sucesso.",
        status: true
      })
    }catch(err){
      next(err);
    }
  }

}

export default new ChannelController();