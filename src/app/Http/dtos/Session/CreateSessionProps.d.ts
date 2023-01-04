import { User } from "@prisma/client";

export interface RequestCreateSessionProps {
    user: User;
}
export interface RequestLoginProps {
    email: string;
    password: string;
}


export interface ResponseCreateSessionProps {
    user: {
        id:string;
        name:string;
        email:string;
        forgoutPasswordToken:string;
        forgoutPasswordDate: Date;
    };
    token: string;
}