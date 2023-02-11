import { sign } from "jsonwebtoken";
import ConfigAuthenticate from "@providers/ConfigAuthenticate";
import { RequestCreateSessionProps, ResponseCreateSessionProps } from "@dtos/Session/CreateSessionProps";

class SessionRepository {
    public async createSession({
        user
    }: RequestCreateSessionProps): Promise<ResponseCreateSessionProps> {
        const { expiresIn, secret } = ConfigAuthenticate.jwt
        const id = String(user.id) as string;
        console.log(id);
        
        const token = sign({}, secret, {
            subject: id,
            expiresIn
        });
        console.log(token);
        const newUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            forgoutPasswordToken: user.forgoutPasswordToken,
            forgoutPasswordDate: user.forgoutPasswordDate,
        }
        return { user: newUser, token };
    }
}

export { SessionRepository }