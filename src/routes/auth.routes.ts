import { Router } from 'express';
import sessionController from '../app/Http/controllers/SessionController';
const authRoutes = Router();

authRoutes
    .post('/', sessionController.createSession)

export { authRoutes };
