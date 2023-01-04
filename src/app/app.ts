import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { route } from '@routes/router';

const app = express();


app.use(cors());

app.use(express.json());

app.use(route);

app.use((
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    return response.status(500).send(error)
});

export { app }
