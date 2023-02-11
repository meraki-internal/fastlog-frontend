import { TypesProject } from "@prisma/client"
export interface CreateProjectProps {
  userId: string;
  name: string;
  isDefault: boolean
}