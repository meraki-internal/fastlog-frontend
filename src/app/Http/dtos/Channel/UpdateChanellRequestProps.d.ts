import { TypesChannel } from "@prisma/client";

export interface UpdateChanellRequestProps{
  id: string,
  name: string
  type: TypesChannel
  active: boolean
}