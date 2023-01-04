import { compare, hash } from "bcryptjs";
import { HashProviderProps } from "../Http/dtos/HashProvider/HashProviderProps";

class HashProvider implements HashProviderProps {
    public async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }
    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        return compare(payload, hashed);
    }
}

export { HashProvider };