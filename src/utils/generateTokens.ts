import jwt, {type SignOptions} from 'jsonwebtoken'
import type { User } from './userType.js';


const generateAccessToken = (user: User[]) => {
    if(!user.length) throw new Error("Cannot generate token as no user was provided");

    const secret = process.env.JWT_SECRET;
    if(!secret) throw new Error("Secret not set in environment");

    //const expiresIn = (process.env.ACCESS_TOKEN_EXPIRES || "1h") as SignOptions["expiresIn"];

    return jwt.sign(
        {
            id: user[0]?.id,
            email:user[0]?.email,
            role: user[0]?.role,
        },
        secret,
        { expiresIn: "1h" }
)}

export {generateAccessToken};