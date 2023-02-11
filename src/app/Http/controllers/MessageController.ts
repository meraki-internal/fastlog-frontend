import { NextFunction, Request, Response } from "express";
import { MessageRepository } from "@repositories/MessageRepository";

class MessageController {

  public async listMessages(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.userId as string;
      const { channelID } = request.params;
      const projectId = request.projectId as string;
      
      const messageRepository = new MessageRepository()
      
      const list = await messageRepository.listMessages({
        projectID: projectId,
        channelID
      })
      
      return response.status(200).json({
        userId,
        projectId,
        data:list
      });

    } catch (err) {
      next(err);
    }
  }
  public async createMessage(request: Request, response: Response, next: NextFunction) {
    try {
      const projectID = request.projectId as string;
      const { channelID, name, description, channel, icon, notify, message, tags } = request.body;
      
      const messageRepository = new MessageRepository();
      const create = await messageRepository.createMessage({
        name,
        description,
        message,
        channelID,
        icon,
        projectID
      })

      return response.status(200).json({
        message: "Você criou uma nova mensagem",
        status: true,
        data: create
      });

    } catch (err) {
      next(err);
    }
  }
}

export default new MessageController();