import { NextFunction, Request, Response } from "express";
import { HashProvider } from "@providers/HashProvider";
import { SessionRepository } from "@repositories/SessionRepository";
import UserRepository from "@repositories/UserRepository";
import { Exception } from "@exceptions/Exception";


class AuthController {
    public async createSession(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = request.body;
            const userRepository = new UserRepository();
            const hashProvider = new HashProvider();
            const sessionRepository = new SessionRepository();

            const user = await userRepository.findUserByEmail(email);
            if (!user) {
                throw new Exception("Email ou senha inválidos", 401);
            }

            const matchPassword = await hashProvider.compareHash(password, user.password);

            if (!matchPassword) {
                throw new Exception("Email ou senha inválidos", 401);
            }


            const session = await sessionRepository.createSession({ user });
            return response.status(200).json(session)
        } catch (err) {
            next(err);
        }
    }

}

export default new AuthController();