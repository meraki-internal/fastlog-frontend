import { TypesChannel } from "@prisma/client"

export interface RequestCreateChannelProps{
  name: string
  type: TypesChannel
  projectId: string
  userId: string
}