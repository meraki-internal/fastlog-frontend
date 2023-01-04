import jwt from 'jsonwebtoken';

export async function generateToken(params = []) {
    return jwt.sign(params, process.env.SECRET_KEY, {
        expiresIn: 86400,
    });
}