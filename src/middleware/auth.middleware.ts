import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware: RequestHandler = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(400).json({
                success: false,
                message: "Access Denied"
            })
        }

        const secret = process.env.JWT_SECRET;
        if(!secret) throw new Error("Secret not set in environment");

        const token = authHeader.split(" ")[1];
        if(!token) {
            throw new Error("No token set");
        }
        
        const decoded = jwt.verify(token, secret);

        if(!decoded) {
            throw new Error("decode not set");
        }

        ( req as any).user = decoded;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Invalid Token"
        })
    }
}