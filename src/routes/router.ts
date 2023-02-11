import { Request, Response, Router } from 'express';
import { userRoutes } from './user.routes'
import { authRoutes } from './auth.routes'
import { projectRoutes } from './projects.routes';
import { messageRoutes } from './message.routes';
import { channelsRoutes } from "@routes/channels.routes";
const route = Router();

route.get('/', (
    request: Request,
    response: Response
) => {
    return response.json({
        messager: 'Hello,world.',
        authors: [
            {
                name: "André Souza",
                email: "andresouza@meraki.dev.br"
            }
        ],
        version: '1.1.0',
    });
});

route
  .use("/user", userRoutes)
  .use("/session", authRoutes)
  .use("/messages", messageRoutes)
  .use("/channels", channelsRoutes)
  .use("/projects", projectRoutes);

export { route };
