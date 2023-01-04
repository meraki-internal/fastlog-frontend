declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            NODE_ENV: string;
            SECRET_KEY:string;
            HASH_APP: string;
            DATABASE_URL: string;
        }
    }
    namespace Express {
        interface Request {
            userId?: string | undefined;
        }
    }
}
export { }