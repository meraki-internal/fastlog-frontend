import { NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken';

export function AuthenticateMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        return response.status(401).json({ messager: 'Você precisa informar um token' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2)
        return response.status(401).json({ messager: 'Token Error! ' });

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema))
        return response
            .status(401)
            .json({ messager: 'Houve uma má formatação no token' });

    jwt.verify(token, process.env.SECRET_KEY, function (err: any, decoded: any) {
        if (err) return response.status(401).json({ messager: 'Token invalido' });
        request.userId = decoded.sub;
        return next();
    });
};
